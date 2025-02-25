import { FormStateType } from "../types/formTypes";

function nameValidation(value:string):[string,boolean]{
    if(value.trim()===''){
        return ['This field is required',true];
    }

    const pattern = /^[a-zA-Z ]*$/;
    if(!pattern.test(value)){
        return ['Enter a valid name',true];
    }
    else if(value.length <3){
        return ['Enter a name of valid length',true];
    }
    return ['',false];
}
function emailValidation(value:string):[string,boolean]{
    if(value.trim()===''){
        return ['This field is required',true];
    }

    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if(!pattern.test(value)){
        return ['Enter a valid Email',true];
    }
    return ['',false];
}

function passwordValidation(value:string):[string,boolean]{
    value =value.trim();
    if(value ===''){
        return ['This field is required',true];
    }
    if(value !=='' &&  value.length < 6){
        return ['Minimum Password length should be 6',true];
    }
    return ['',false];
}


function fieldValidation(value:string):[string,boolean]{
    if(!value){
        return ['This field is required',true];
    }
    
    if(String(value).trim() ===''){
        return ['This field is required',true];
    }
    else if(String(value).length < 3){
        return ['Please enter valid data',true];
    }
    
    return ['',false];
}

export function dateValidation(value:string):[string,boolean]{
    if(!value){
        return ['This field is required',true];
    }
    const user_date = new Date(value);
    let curr_date = new Date();
    curr_date.setFullYear(curr_date.getFullYear()- 18);
    
    if(curr_date.getTime()<user_date.getTime()){
        return ['User must be 18 years old',true]
    }
    return ['',false];
    
    
}



export function validation(title:string,value:string):[string,boolean]{
   
    title = title.toLowerCase();
    if(title === 'email'){
        return emailValidation(value);
    }

    if(title === 'password'){
        return passwordValidation(value);
    }
    
    if(title === 'contact' ){
        
        if(Number(value) <  0 || value.length !== 10){
            return [`Please enter valid number of 10 digits`,true];
        }
        return ['',false];
    }
    
    if(title === 'name' ){
        return nameValidation(value);
    }

    if(title === 'dob'){
        return dateValidation(value);
    }
    
    return fieldValidation(value);
}

export function checkValidFormState(formState:FormStateType){
    for(const key in formState){
    const [,state] = validation(key,formState[key].value)
    if(state === true){
        
        return false;
    }
    if(formState[key].status || !String(formState[key].value)){
        return false;
    }  
    }
    return true;
}

export function populateFormState(formState:FormStateType){
    for(const key in formState){
         const [msg,status] = validation(key,formState[key].value);
         formState ={
            ...formState,
            [key]:{
                message:msg,
                status:status,
                value:formState[key].value
            }
         }
    }
    
    return formState;
}
