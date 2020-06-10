import React, {Component} from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";

class Info extends Component {
    render() {
        return (
            <div className={'Info'}>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">Beda React</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <NavLink to={'/'} className={'nav-link'}>Главная</NavLink>
                            <NavLink to={'/info'} className={'nav-link'}>Информация</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
                <div className="content">
                    <h1>Иноформация</h1>
                    <p>Не следует, однако, забывать, что высококачественный прототип будущего проекта способствует повышению качества поставленных обществом задач. С другой стороны, синтетическое тестирование способствует подготовке и реализации экономической целесообразности принимаемых решений. Имеется спорная точка зрения, гласящая примерно следующее: сторонники тоталитаризма в науке неоднозначны и будут заблокированы в рамках своих собственных рациональных ограничений. Как принято считать, непосредственные участники технического прогресса превращены в посмешище, хотя само их существование приносит несомненную пользу обществу. И нет сомнений, что базовые сценарии поведения пользователей могут быть объединены в целые кластеры себе подобных. Значимость этих проблем настолько очевидна, что убеждённость некоторых оппонентов играет важную роль в формировании прогресса профессионального сообщества. Предварительные выводы неутешительны: выбранный нами инновационный путь является качественно новой ступенью существующих финансовых и административных условий. Безусловно, глубокий уровень погружения говорит о возможностях как самодостаточных, так и внешне зависимых концептуальных решений! В рамках спецификации современных стандартов, многие известные личности могут быть рассмотрены исключительно в разрезе маркетинговых и финансовых предпосылок. Как уже неоднократно упомянуто, тщательные исследования конкурентов, вне зависимости от их уровня, должны быть превращены в посмешище, хотя само их существование приносит несомненную пользу обществу. Внезапно, непосредственные участники технического прогресса набирают популярность среди определенных слоев населения, а значит, должны быть ассоциативно распределены по отраслям.</p>
                </div>
            </div>
        );
    }
}

export default Info;