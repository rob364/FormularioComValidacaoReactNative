import { useState } from "react"

const Form = () => {
    const [form, SetForm] = useState({
        name: "",
        email: "",
        gender: ""
    })

    const [emptyValue, SetEmptyValue] = useState(false);
    const [validEmail, SetValidEmail] = useState(false);

    const handleChange = (e) => {
        let newProp = form;
        SetValidEmail(true);
        newProp[e.target.name] = e.target.value;
        SetForm({...newProp})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        //Verificar se existem campos não preenchidos
        let emptyValues = Object.values(form).some(obj => obj == "");
        SetEmptyValue(emptyValues)

        let validEmail = form["email"].toLocaleLowerCase().match(/[a-z]+@[a-z]+\.com(\.br)*/)
        SetValidEmail(validEmail)

        if (!emptyValue && validEmail) {
            fetch("http://localhost:3000", {method: "POST", body: JSON.stringify(form)});
            e.currentTarget.submit()
        }
    }
    return(
    <div>
        <h2>Preencha os campos abaixo</h2>
        <form onSubmit={(e) => {handleSubmit(e)}}>
            <label>Nome:</label>
            <input type="text" name="name" onBlur={(e) => handleChange(e)} />
            { emptyValue && form["name"] == "" ? <span className="emptyText">O campo precisa ser preenchido</span> : ""}
            <br /> 

            <label>E-mail:</label>
            <input type="text" name="email" onBlur={(e) => handleChange(e)}/>
            { emptyValue && form["email"] === "" ? <span className="emptyText">O campo email precisa ser preenchido</span> : ""}
            { !validEmail && form["email"] !== "" ? <span className="emptyText">E-mail invalido</span> : ""} 
            <br />

            <label>Gênero:</label>
            <select name="gender"  onChange={(e) => handleChange(e)}>
                <option>-</option>
                <option>M</option>
                <option>F</option>

            </select>
            { emptyValue && form["gender"] == "" ? <span className="emptyText">O campo gênero precisa ser preenchido</span> : ""}
            <br />
            <button type="submit">Enviar</button>
        </form>
    </div>
    )
}

export default Form