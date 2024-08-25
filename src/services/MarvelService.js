class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=9f935f1f412d521ee53ee05920a38689';
    _baseOffset = 210;

    getResource = async (url) => {
        let res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    };

    getAllCharacters = async (offset = this._baseOffset) => {
        //назначаеться аргумент что бы более гибко подстраивать код например если не передаеться ничего в аргумен то береться переменная выше по иерархии _baseOffset
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        // this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        let descr = char.description.length > 100 ? char.description.substring(0, 100) + '...' : char.description;

        return {
            // name: res.data.results[0].name,
            id: char.id,
            name: char.name,
            description: descr === '' ? descr = "There's no information about this character." : descr,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
}

export default MarvelService;