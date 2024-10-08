import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {
    state = {
        // name: null,
        // description: null,
        // thumbnail: null,
        // homepage: null,
        // wiki: null
        char: {},
        loading: true,
        error: false,
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
        // this.timerId = setInterval(this.updateChar, 5000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => {
        // this.setState({char})
        this.setState({
            char,
            loading: false
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        // this.setState({char})
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.onCharLoading();
        this.marvelService
            // .getAllCharacters()
            // .then(res => console.log(res))
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
            // .then(res => {
            //     this.setState(res)
            // })
    }

    nextChar = () => {
        this.setState({
            loading: true,
            error: false
        })
        this.updateChar();
    }

    render() {
        // const {name, description, thumbnail, homepage, wiki} = this.state;
        // const {char: {name, description, thumbnail, homepage, wiki}, loading} = this.state;
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        // if(loading) {
        //     return <Spinner/>
        // }

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                {/* {loading ? <Spinner/> : <View char={char}/>} */}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main" onClick={this.updateChar}>
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    let imgStyle = {'objectFit' : 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;