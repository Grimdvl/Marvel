import img from './error.gif';

const ErrorMessage = () => {
    // способ достучаться до паблик папки но лучше использовать из папки ресурсов
    // return (
    //     <img src={process.env.PUBLIC_URL + '/error.gif'}/>
    // )
    return (
        <img 
            src={img}
            style ={{display: 'block', width: '250px', height: '250px', objectFit: 'contain', margin: '0 auto'}}
            alt='Error'/>
    )
}

export default ErrorMessage;