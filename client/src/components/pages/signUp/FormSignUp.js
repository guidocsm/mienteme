

import { Form, Modal } from 'react-bootstrap'
import { useState, useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import EditDate from '../editDate/EditDate'
import UserContext from '../../services/UserContext'
import PeopleService from '../../services/people.service'
import UploadsService from '../../services/uploads.service'
const uploadsService = new UploadsService()
const peopleService = new PeopleService()

const FormSignUp = () => {

    let history = useHistory()

    const [modal, setModal] = useState(false)


    const { loggedUser, storeUser } = useContext(UserContext)
    const [formData, setFormData] = useState({
        username: "",
        profileImages: "",
        age: "",
        gender: "",
        bio: "",
        genderFilter: "",
        ageFirstFilter: undefined,
        ageSecondFilter: undefined,
        city: "",
        questionTrue: "",
        questionFalse: "",
        clue: "",
    })



    const handleChange = e => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }


    const handleSubmit = e => {
        e.preventDefault()

        peopleService
            .editProfile(loggedUser._id, formData)
            .then(res => {
                storeUser(res.data)
                openModal()
            })
            .catch(err => console.error(err))

    }


    // const handleFile = e => {

    //     setFormData({ ...formData, isLoading: true })

    //     const uploadedData = new FormData()
    //     uploadedData.append('imageData', e.target.files[0])

    //     uploadsService
    //         .uploadImg(uploadedData)
    //         .then(res => setFormData({ ...formData, isLoading: false, profileImages: res.data.cloudinary_url }))
    //         .catch(err => console.error(err)) 
            
    // }



    const openModal = () => {
        setModal(true)

    }

    const closeModal = () => {
        setModal(false)
        history.push("/click-me") 
    }


    return (

        <>
            <h1>Editar Perfil</h1>


            <Form className="" onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <div className="editProfile-data">Username</div>
                    <Form.Label></Form.Label>
                    <Form.Control className="editProfile-input" name="username" value={formData.username} onChange={e => handleChange(e)} type="text" placeholder="Nombre de usuario" />
                </Form.Group>

                {/* <Form.Group className="editProfile-data-container" controlId="formBasicPassword">
                    <div className="editProfile-data">Imagen</div>
                    <Form.Label></Form.Label>
                    <Form.Control name="profileImages" value={formData.profileImages} onChange={(e) => handleFile(e)} type="file" />
                </Form.Group> */}

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <div className="editProfile-data">Edad</div>
                    <Form.Control className="editProfile-input" name="age" value={formData.age} onChange={e => handleChange(e)} type="number" placeholder="Edad" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <div className="editProfile-data">Bio</div>
                    <Form.Control className="editProfile-input" name="bio" value={formData.bio} onChange={e => handleChange(e)} type="textarea" placeholder="Acerca de mí" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <div className="editProfile-data">Ciudad</div>
                    <Form.Control className="editProfile-input" name="city" value={formData.city} onChange={e => handleChange(e)} type="text" placeholder="Ciudad" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <div className="editProfile-data">Pregunta verdadera</div>
                    <Form.Control className="editProfile-input" name="questionTrue" value={formData.questionTrue} onChange={e => handleChange(e)} type="text" placeholder="Pregunta Verdadera" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <div className="editProfile-data">Pregunta Falsa</div>
                    <Form.Control className="editProfile-input" name="questionFalse" value={formData.questionFalse} onChange={e => handleChange(e)} type="text" placeholder="Pregunta Falsa" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <div className="editProfile-data">Pista</div>
                    <Form.Control className="editProfile-input" name="clue" value={formData.clue} onChange={e => handleChange(e)} type="text" placeholder="Pon una pista..." />
                </Form.Group>
                <br />

                <h3 className="editProfile-h3">¿Con quién quieres quedar?</h3>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <p className="editProfile-data">Género</p>
                    <Form.Control className="editProfile-input" name="genderFilter" value={formData.genderFilter} onChange={e => handleChange(e)} type="text" placeholder="¿Mujer, hombre o ambos?" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox"> <p className="editProfile-data">Edad(desde/hasta)</p>
                    <Form.Control className="editProfile-input" name="ageFirstFilter" value={formData.ageFirstFilter} onChange={e => handleChange(e)} type="text" placeholder="Filtra por edad, introduce un número " />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Control className="editProfile-input" name="ageSecondFilter" value={formData.ageSecondFilter} onChange={e => handleChange(e)} type="text" placeholder="hasta..." />
                </Form.Group>

                <button className="editProfile-button" style={{ cursor: "pointer" }}>
                    Guardar
                </button>
            </Form>

                <Modal
                    show={modal}
                    backdrop="static"
                    onHide={closeModal}>

                    <Modal.Header closeButton>
                        <Modal.Title>Crea tu primera cita</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <EditDate closeModal={closeModal} />
                    </Modal.Body>
                </Modal>



        </>


    )
}

export default FormSignUp