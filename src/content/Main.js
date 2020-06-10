import React, {Component} from 'react';
import {Button, Col, Form, Jumbotron, Modal, Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import validator from 'validator';
import Item from "./Item";
import axios from 'axios'

class Main extends Component {
    state = {
      text: '',
      sortingValue: 'idPlus',
      persons: [],
      showModal: false,
        firstNameAdd: '',
        secondNameAdd: '',
        lastNameAdd: '',
        phoneAdd: '',
        emailAdd: '',
        bornAdd: '',
        departmentAdd: 'IT'
    };

    async componentDidMount() {
        try {
            const response = await axios.get('https://beda-143e1.firebaseio.com/persons.json');
            const persons = Object.entries(response.data).map((person) => {
                return {
                    personId: person[0],
                    personData: person[1]
                }
            });
            this.setState({persons})
        } catch (e) {
            console.log(e)
        }
    }

    closeHandler = () => {
      this.setState({showModal: false})
    };

    openModalAdd = () => {
      this.setState({showModal: true})
    };

    searchHandler = event => {
        this.setState({text: event.target.value})
    };

    searchingHandler = text => {
        return function(x) {
            return (x.personData.firstName.toLowerCase().includes(text.toLowerCase())) || (x.personData.secondName.toLowerCase().includes(text.toLowerCase())) || !text
        }
    };

    sortingHandler = (event) => {
        const getAge = require('get-age');
        if (event.target.value === 'idPlus') {
            const sorting = this.state.persons;
            sorting.sort(function (a,b) {
                return a.personId - b.personId
            });
            this.setState({persons: sorting})
        }
        else if (event.target.value === 'idMinus') {
            const sorting = this.state.persons;
            sorting.sort(function (a,b) {
                return a.personId - b.personId
            });
            sorting.reverse();
            this.setState({persons: sorting})
        }
        else if (event.target.value === 'agePlus') {
            const sorting = this.state.persons;
            sorting.sort(function (a,b) {
                return getAge(a.personData.born) - getAge(b.personData.born)
            });
            this.setState({persons: sorting})
        }
        else if (event.target.value === 'ageMinus') {
            const sorting = this.state.persons;
            sorting.sort(function (a,b) {
                return getAge(a.personData.born) - getAge(b.personData.born)
            });
            sorting.reverse();
            this.setState({persons: sorting})
        }
        this.setState({sortingValue: event.target.value})
    };

    addFirstName = event => {
        this.setState({firstNameAdd: event.target.value})
    };
    addSecondName = event => {
        this.setState({secondNameAdd: event.target.value})
    };
    addLastName = event => {
        this.setState({lastNameAdd: event.target.value})
    };
    addPhone = event => {
        const isValidPhoneNumber = validator.isMobilePhone(event.target.value);
        if (isValidPhoneNumber) {
            this.setState({phoneAdd: event.target.value})
        }
    };
    addEmail = event => {
        const isValidEmail = validator.isEmail(event.target.value);
        if (isValidEmail) {
            this.setState({emailAdd: event.target.value})
        }
    };
    addBorn = event => {
        this.setState({bornAdd: event.target.value})
    };
    addDepartment = event => {
        this.setState({departmentAdd: event.target.value})
    };

    addPersonBase = async () => {
        try {
            await axios.post('https://beda-143e1.firebaseio.com/persons.json', {
                firstName: this.state.firstNameAdd,
                secondName: this.state.secondNameAdd,
                lastName: this.state.lastNameAdd,
                phone: this.state.phoneAdd,
                email: this.state.emailAdd,
                born: this.state.bornAdd,
                department: this.state.departmentAdd
            });
            window.location.reload();
        } catch (e) {
            console.log(e)
        }
    };

    render() {
        const isValidEmailAdd = validator.isEmail(this.state.emailAdd);
        const isValidPhoneNumberAdd = validator.isMobilePhone(this.state.phoneAdd);
        const validateAdd = (
            (this.state.firstNameAdd === '')||
            (this.state.secondNameAdd === '')||
            (this.state.lastNameAdd === '')||
            (this.state.bornAdd === null)||
            (this.state.emailAdd === '')||
            (this.state.phoneAdd === null)||
            (this.state.departmentAdd === '')||
            (!isValidPhoneNumberAdd)||
            (!isValidEmailAdd)
        );
        return (
            <div className={'Main'}>

                <Modal show={this.state.showModal} onHide={this.closeHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавление сотрудника</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Фамилия</Form.Label>
                                    <Form.Control type="text" placeholder="Беда" onChange={this.addSecondName} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Имя</Form.Label>
                                    <Form.Control type="text" placeholder="Мария" onChange={this.addFirstName} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Отчество</Form.Label>
                                    <Form.Control type="text" placeholder="Николаевна" onChange={this.addLastName} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Телефон</Form.Label>
                                    <Form.Control
                                        type="tel"
                                        pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}"
                                        placeholder="+7(___)___-__-__"
                                        onChange={this.addPhone}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="beda@mail.ru" onChange={this.addEmail} />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Дата рождения</Form.Label>
                                    <Form.Control type="date" placeholder="16.10.2000" onChange={this.addBorn} />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label>Отдел</Form.Label>
                                    <Form.Control as="select" defaultValue={this.state.addDepartment} onChange={this.addDepartment}>
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
                        <Button variant="secondary" onClick={this.closeHandler}>
                            Закрыть
                        </Button>
                        {!validateAdd ?
                            <Button variant="success" onClick={this.addPersonBase}>
                                Добавить
                            </Button> :
                            <Button variant="success" disabled>
                                Добавить
                            </Button>
                        }
                    </Modal.Footer>
                </Modal>

                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">Beda React</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink to={'/'} className={'nav-link'}>Главная</NavLink>
                            <NavLink to={'/info'} className={'nav-link'}>Информация</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <Jumbotron>
                    <h1>Список сотрудников</h1>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridState" onClick={this.sortingHandler} defaultValue={this.state.sortingValue}>
                                <Form.Control as="select">
                                    <option value={'idPlus'}>По возрастанию id</option>
                                    <option value={'idMinus'}>По убыванию id</option>
                                    <option value={'agePlus'}>По возрастанию возраста</option>
                                    <option value={'ageMinus'}>По убыванию возраста</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col} controlId="search">
                                <Form.Control type="text" placeholder="Поиск по имени или фамилии" onChange={this.searchHandler} />
                            </Form.Group>
                        </Form.Row>
                    </Form>
                    <p>
                        <Button variant="primary" onClick={this.openModalAdd}>Добавить сотрудника</Button>
                    </p>
                </Jumbotron>
                <div className="container-fluid">
                    <div className="row">
                        {this.state.persons.filter(this.searchingHandler(this.state.text)).map((person, index) => {
                            return (
                                <Item
                                    key={index+person}
                                    id={person.personId}
                                    personData={person.personData}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Main;