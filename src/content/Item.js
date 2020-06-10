import React, {Component} from 'react';
import {Button, Card, Col, Form, ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import validator from 'validator';
import axios from 'axios'

class Item extends Component {
    state = {
        showDelete: false,
        showEdit: false,
        firstName: '',
        secondName: '',
        lastName: '',
        phone: '',
        email: '',
        born: '',
        department: ''
    };
    async componentDidMount() {
        try {
            const response  = await axios.get(`https://beda-143e1.firebaseio.com/persons/${this.props.id}.json`);
            const data = response.data;
            this.setState({
                firstName: data.firstName,
                secondName: data.secondName,
                lastName: data.lastName,
                phone: data.phone,
                email: data.email,
                born: data.born,
                department: data.department
            })
        } catch (e) {
            console.log(e)
        }
    }
    handleDeleteClose = () => {
      this.setState({showDelete: false})
    };
    handleEditClose = () => {
        this.setState({showEdit: false})
    };
    openDelete = () => {
        this.setState({showDelete: true})
    };
    openEdit = () => {
        this.setState({showEdit: true})
    };
    changeFirstName = event => {
        this.setState({firstName: event.target.value})
    };
    changeSecondName = event => {
        this.setState({secondName: event.target.value})
    };
    changeLastName = event => {
        this.setState({lastName: event.target.value})
    };
    changePhone = event => {
        const isValidPhoneNumber = validator.isMobilePhone(event.target.value);
        if (isValidPhoneNumber) {
            this.setState({phone: event.target.value})
        }
    };
    changeEmail = event => {
        const isValidEmail = validator.isEmail(event.target.value);
        if (isValidEmail) {
            this.setState({email: event.target.value})
        }
    };
    changeBorn = event => {
        this.setState({born: event.target.value})
    };
    changeDepartment = event => {
        this.setState({department: event.target.value})
    };
    deletePersonBase = async () => {
        try {
            await axios.delete(`https://beda-143e1.firebaseio.com/persons/${this.props.id}.json`);
            this.setState({showDelete: false});
            window.location.reload();
        } catch (e) {
            console.log(e)
        }
    };
    editPersonBase = async () => {
        try {
            await axios.put(`https://beda-143e1.firebaseio.com/persons/${this.props.id}.json`, {
                firstName: this.state.firstName,
                secondName: this.state.secondName,
                lastName: this.state.lastName,
                born: this.state.born,
                phone: this.state.phone,
                email: this.state.email,
                department: this.state.department
            });
            window.location.reload();
        } catch (e) {
            console.log(e)
        }
    };
    render() {
        const isValidEmailEdit = validator.isEmail(this.state.email);
        const isValidPhoneNumberEdit = validator.isMobilePhone(this.state.phone);
        const validateEdit = (
            (this.state.firstName === '')||
            (this.state.secondName === '')||
            (this.state.lastName === '')||
            (this.state.born === null)||
            (this.state.email === '')||
            (this.state.phone === null)||
            (this.state.department === '')||
            (!isValidPhoneNumberEdit)||
            (!isValidEmailEdit)
        );
        return (
            <div className={'col-lg-3'}>

                <Modal show={this.state.showDelete} onHide={this.handleDeleteClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Удаление сотрудника</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Вы действитель хотите удалить сотрудника <b>{`${this.props.personData.secondName} ${this.props.personData.firstName} ${this.props.personData.lastName}`}</b> ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleDeleteClose}>
                            Закрыть
                        </Button>
                        <Button variant="danger" onClick={this.deletePersonBase}>
                            Удалить
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.showEdit} onHide={this.handleEditClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Редактировать профиль</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Фамилия</Form.Label>
                                    <Form.Control type="text" placeholder="Мария" defaultValue={this.state.secondName} onChange={this.changeSecondName} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Имя</Form.Label>
                                    <Form.Control type="text" placeholder="Беда" defaultValue={this.state.firstName} onChange={this.changeFirstName} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Отчество</Form.Label>
                                    <Form.Control type="text" placeholder="Николаевна" defaultValue={this.state.lastName} onChange={this.changeLastName} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Телефон</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"
                                        placeholder="+7(___)___-__-__"
                                        onChange={this.changePhone}
                                        defaultValue={this.state.phone}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="beda@mail.ru" defaultValue={this.state.email} onChange={this.changeEmail} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Дата рождения</Form.Label>
                                    <Form.Control type="date" placeholder="16.10.2000" defaultValue={this.state.born} onChange={this.changeBorn} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Отдел</Form.Label>
                                    <Form.Control as="select" defaultValue={this.state.department} onChange={this.changeDepartment}>
                                        <option value={'IT'}>IT</option>
                                        <option value={'Sales'}>Отдел продаж</option>
                                        <option value={'Delivery'}>Отдел доставки</option>
                                        <option value={'Legal'}>Юридический отдел</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleEditClose}>
                            Закрыть
                        </Button>
                        <Button variant="danger" onClick={this.deletePersonBase}>
                            Удалить
                        </Button>
                        {!validateEdit ?
                            <Button variant="primary" onClick={this.editPersonBase}>
                                Редактировать
                            </Button> :
                            <Button variant="primary" disabled>
                                Редактировать
                            </Button>
                        }
                    </Modal.Footer>
                </Modal>

                <Card>
                    <Card.Body>
                        <Card.Title>{`${this.props.personData.secondName} ${this.props.personData.firstName} ${this.props.personData.lastName}`}</Card.Title>
                        <Card.Text>{this.props.id}</Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem><b>Телефон:</b> {this.props.personData.phone}</ListGroupItem>
                        <ListGroupItem><b>Email:</b> {this.props.personData.email}</ListGroupItem>
                        <ListGroupItem><b>Дата рождения:</b> {this.props.personData.born}</ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Button variant={'primary'} onClick={this.openEdit}>Редактировать</Button>
                        <Button variant={'danger'} style={{marginLeft: '1rem'}} onClick={this.openDelete}>Удалить</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">{this.props.personData.department}</Card.Footer>
                </Card>
            </div>
        );
    }
}

export default Item;