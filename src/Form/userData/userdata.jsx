import {cv} from '../../resume/resume';                                        //hace validación de formulario
import { useContext, useState } from 'react';                                  // importa todos los módulos
import { TemplateState } from '../../Context/CVContext';
import Work from '../Work/work';
import Education from '../Education/education';
import References from '../References/references';
import Skills from '../Skills/skills';
import Interests from '../Interests/interests';

const UserData = () => {

  const [state, setState] = useContext(TemplateState);
  const [selectedImage, setSelectedImage] = useState(null);
  const [valueImg, setValueImg] = useState(null);
 
  console.log('state inicial', state);

  const handleSubmit = (e) => {
                
          e.preventDefault();
          
          if (e.target.type === 'file') {
                  
                  let blob = new Blob([e.target.files[0]], { type: "image" });  // llamada asíncrona para pasar la foto a base64
                  let reader = new FileReader();
                  reader.readAsDataURL(blob);
                  reader.onloadend = function () {

                          let base64String = reader.result;
                          setValueImg(base64String);     // guardo el valor que después uso para el src de la img en un hook
                          const returnList2 = [{id: "foto", img: base64String, value: e.target.files[0] }]
                          //const  userInput = {id: "foto", img: base64String, value: e.target.files[0] }
                          setState({"foto": {img: base64String}})
                          

                  }
            }
                
          const form = document.querySelector('#userForm')  
          

          let newState = {}  //este obj contiene otro obj

          for (let item of form) {
          
              let formItem = new Object();  //Creo un nuevo objeto para guardar los ítems del form en el newState//


              if (item.id === 'foto') {
                      
                      formItem.img = valueImg  // le paso el valor que uso para el scr de la imagen por hook de nuevo acá para que no lo cargué en una segunda lectura del código
                      
              }
                  
              else if (item.id != 'foto') {

                     
                      formItem.value = item.value;
                      
              }
              
              newState[item.id] = formItem       //cada obj del formItem se guarda con un ID dentro del newState
            
          }

          setState(newState);   // el obj newState se guarda en el contexto

          
  }
            

  const loadImg = (e) => {
      setSelectedImage(e.target.files[0]);                            
  }

    return ( 
      
      <>

          <form id = 'userForm' className='cvForm' onInput={handleSubmit}>

              <div className='category-container'>

                    <h2 id='form-title'>Formulario CV</h2>

                      <h3 className='title'>1. Información personal</h3>
                        
                          
                                {Object.entries(cv.basics).map (element => {

                                      if (element[0]==='foto') { 
                                        return(

                                          <>
                                          
                                              <label className='sub-label' id={element[0] + `-label`} key={element[0]}>{element[0]}
                                                <input type='file' id={element[0]} onChange={(loadImg)} />
                                              </label>
                                              <div>
                                                  {selectedImage && (
                                                    <div id='img-container'>
                                                      <img alt="not found" width={"175px"} height={'200px'} src={URL.createObjectURL(selectedImage)} />
                                                      <br />
                                                      <button onClick={() => setSelectedImage(null)}>Quitar</button>
                                                    </div>
                                                  )} 
                                                  <br />
                                                </div>
                                          </>

                                            )
                                          }

                                          else if (element[0]==='descripción') {
                                            return [
                                                  <p className='textarea-title'>Descripción del pérfil</p>, 
                                                  <textarea className= 'sub-label'id={element[0]} key={element[0]} placeholder={element[1]} rows={'5'} maxLength={'250'}></textarea>
                                                ]
                                          }

                                          else 
                                          return (
                                            <div className='sub-label' id={element[0] + `label-container`} key={element[0]}>
                                            <label className ='sub-label'id={element[0] + `label`} key={element[0]}>{element[0]}
                                              <input input type='text' id={element[0] + `-input`} placeholder={element[1]}/>
                                            </label>
                                          </div>
                                          )
                                      
                                    })}

                                    {Object.entries(cv.basics.location).map (element => 
                                        
                                          <div className='sub-label' id={element[0] + `label-container`} key={element[0]}>
                                            <label className ='sub-label'id={element[0] + `label`} key={element[0]}>{element[0]}
                                              <input input type='text' id={element[0]} placeholder={element[1]}/>
                                            </label>
                                          </div>

                                    )}

                          

              </div>
              
                      
                      
                        <div className='category-container'>
                            <h3 className='title'>2. Experiencia laboral</h3>
                              <Work/>
                            <h3 className='title'>3. Educación</h3>
                              <Education/>
                            <h3 className='title'>4. Recomendaciones</h3>
                              <References/>
                            <h3 className='title'>4. Habilidades</h3>
                              <Skills/>
                            <h3 className='title'>5. Intereses</h3>
                              <Interests/>
                        </div>
                        <div className='form-btn-container'> 
                            {/* {<input id = 'guardar' type='submit' value='¡Crear CV!'/>} */}
                        </div>
          </form>
      </>
        
    )

}

export default UserData;


