import React from 'react';

const AnimalList = (props) => {
    return (
        props.animals.map(animal =>
            <tr id="row" key={animal.name}>
                <td id="nametd">{animal.name}</td>
                <td id="breedtd">{animal.breed}</td>
                <td id="agetd">{animal.age}</td>
                <td id="locationtd">{animal.location}</td>
            </tr>
        )
    )
};

export default AnimalList;