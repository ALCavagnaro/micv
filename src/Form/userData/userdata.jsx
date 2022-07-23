import {cv} from '../../resume/resume';                                        //hace validación de formulario
import { useContext, useState } from 'react';                                  // importa todos los módulos
import { TemplateState } from '../../Context/CVContext';
import Work from '../Work/work';
import Education from '../Education/education';
import References from '../References/references';
import Skills from '../Skills/skills';
import Interests from '../Interests/interests';
import {Link} from 'react-router-dom';

const UserData = () => {

  const [state, setState] = useContext(TemplateState);
  const [selectedImage, setSelectedImage] = useState(null);
  //const [goToTemplate, setGoToTemplate] = useState(false);

//   const loadImg = (e) => {

//     e.preventDefault();
//     let blob = new Blob([selectedImage], { type: "image" });
//     let reader = new FileReader();
//     reader.readAsDataURL(blob);
//     reader.onloadend = function () {

//         let base64String = reader.result;

//         console.log("reader result", reader.result);
//         console.log("selected image", selectedImage);

//         setSelectedImage(e.target.files[0]);

//         const form = document.querySelector('#userForm')

//         console.log("formulario", form)
//         console.log(form["foto"])

//         let list;

//         let returnList = [];

//         for (let item of form) {
        
//             list = new Object();  //Creo un nuevo objeto para guardar los ítems del form en State//

//                   if (item.id === 'foto') 
//                 {
//                   list.id = item.id
//                   list.img = base64String
//                   list.value = selectedImage
//                   returnList.push(list)
                  
//                 }

//             }

//             setState([returnList])

          
//            console.log('img value - 2:', e.target.files, "lista loadImg: ", returnList);

    
//   }

// } 

    

    const handleSubmit = (e) => {
                
                e.preventDefault();
                let blob = new Blob([selectedImage], { type: "image" });
                let reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function () {

                      let base64String = reader.result;

                      console.log('reader result', reader.result)
            
                      let element = document.querySelector('#location-input');
                      element.classList.remove('mandatory');
                      
                      const form = document.querySelector('#userForm')  // CAMBIAR ESTE CÓDIGO //

                      let list;

                      let returnList = [];

                      for (let item of form) {
                      
                          list = new Object();  //Creo un nuevo objeto para guardar los ítems del form en State//

                          if (item.id === 'eliminar' || item.id === 'guardar') 
                              {
                              list.id = item.id;
                              list.value = ''}

                          else if (item.id === 'foto') 
                              {
                                list.id = item.id
                                list.img = base64String
                                list.value = selectedImage
                                returnList.push(list)
                                
                              }
                              
                          else 
                              {
                              list.id = item.id;
                              list.value = item.value;
                              returnList.push(list);
                              
                              }
                        
                      }

                      //setState(state.lenght = 0);
                      setState([returnList])
                      console.log('Estado de state', state, "lista: handlesubmit", returnList)
                

                      // const mandatory = document.querySelectorAll('.mandatory')

                      // for (let item of mandatory) {

                      //   const result = item.value;
                      
                      //       if (result !== '') {
                              
                      //         setState(state.lenght = 0);
                      //         setState([returnList]);
                      //         setGoToTemplate(true);
                      //       }
                              
                      //       else {

                      //         alert('Completar los campos obligatorios indicados con *');

                      //       }

                      // } 
                      
            

            
                 }

                
      

          
        
    
     }

                const loadImg = (e) => {

                  e.preventDefault();
                  let blob = new Blob([selectedImage], { type: "image" });
                  let reader = new FileReader();
                  reader.readAsDataURL(blob);
                  reader.onloadend = function () {

                      let base64String = reader.result;

                      console.log('img value - 1:', e.target.files[0]);

                      setSelectedImage(e.target.files[0]);

                      const form = document.querySelector('#userForm')

                      let list;

                      let returnList = [];

                      for (let item of form) {
                      
                          list = new Object();  //Creo un nuevo objeto para guardar los ítems del form en State//

                                if (item.id === 'foto') 
                              {
                                list.id = item.id
                                list.img = base64String
                                list.value = selectedImage
                                returnList.push(list)
                                
                              }

                          }

                          setState([returnList])
              
                        
                          console.log('img value - 2:', e.target.files[0]);
              
                  
                }

          }  
      
            
    

    return ( 
      
      <>

          <form id = 'userForm' className='cvForm' onInput={handleSubmit}>

              <div className='category-container'>

                    <h2 id='form-title'>Formulario CV</h2>

                      <h3 className='title'>1. Información personal</h3>


                      {Object.entries(cv.basics).map (element => {

                            if (element[0] !=='foto' && element[0] !== 'descripción' && element[0] !== 'email' && element[0] !== 'linkedin') {
                            return (
                              <label className='sub-label-mandatory' id={element[0]} key={element[0]}>{element[0]}   
                                  <input type='text' id={element[0] + `-input`} placeholder={element[1]} className={'mandatory'}/> 
                              </label>
                            ) }

                            else if (element[0] ==='descripción') { 
                              return [
                                <p className='textarea-title'>Descripción del pérfil</p>, 
                                <textarea className= 'sub-label'id={element[0]} key={element[0]} placeholder={element[1]} rows={'5'} maxlength={'250'}></textarea>
                              ]
                            }

                            else if (element[0] ==='email') { 
                              return(
                                <label className='sub-label-mandatory' id={element[0]} key={element[0]} for='email'>{element[0]}   
                                  <input type='email' id={element[0] + `-input`} placeholder={element[1]} className={'mandatory'}/> 
                              </label>
                              )
                            }

                            else if (element[0] ==='linkedin') { 
                              return(
                                <label className='sub-label' id={element[0]} key={element[0]}>{element[0]}   
                                  <input type='text' id={element[0] + `-input`} placeholder={element[1]}/> 
                              </label>
                              )
                            }

                            else {
                              return ( 
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


