import { Article } from './article';
import { Country } from './country';

export class Shop{
    country: Country;
    articles: Article[];
}


export class PanierElement{
    

    quantity: number = 0;
    articleId: number;
}