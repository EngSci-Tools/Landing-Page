import Subject from '../Subject.mjs'

import axios from 'axios'
import cheerio from 'cheerio'
import rxjs from 'rxjs'
const { BehaviorSubject, interval } = rxjs;


export default class NewsScraperV2 extends Subject {
    initialize (params) {
        this.articles = []
        this.url = params.url
    }

    getPage() {
        // Resolve the html if possible or 
        return new Promise((resolve, reject) => {
            axios.get(this.url)
                .then((response) => {
                    if(response.status === 200) {
                    const html = response.data;
                        resolve(cheerio.load(html));
                }
                }, (error) => reject(error) )
        })
    }

    async update () {
        const self = this
        console.log("Scraping: ", this.url)
        try {
            const $ = await this.getPage()
            const existingArticles = this.articles.map(article => article.title)
            let articlesAdded = 0
            $('.news').each(function() {
                const header = $(this).find('.article-header')
                const title = header.find('h3').text().trim()
                if (existingArticles.indexOf(title) > -1) {
                    return
                }
                const date = new Date(header.find('time').attr('datetime'))
                const link = header.find('a').attr('href')

                const body = $(this).find('section')
                const description = body.find('p').first().contents().filter(function() {
                    return this.type === 'text'
                }).text()

                self.articles.push({
                    title, date, link, description
                });
                articlesAdded++
            });
            if (articlesAdded > 0) {
                this.articles.sort((a, b) => {
                    return a.date.getTime() - b.date.getTime()
                }).reverse()
                return this.articles
            }
        } catch(err) {
            console.log("Failed to get page: ", err)
        }
    }
}
class NewsScraper {
    constructor(url = 'https://engsci.utoronto.ca/news/') {
        this.url = url;
        this.onNews = new BehaviorSubject()
        interval(1000*60*30).subscribe(() => this.scrape()) // Refresh the articles every 30 minutes

        this.articles = [];
        this.scrape();
    }

    getPage() {
        // Resolve the html if possible or 
        return new Promise((resolve, reject) => {
            axios.get(this.url)
                .then((response) => {
                    if(response.status === 200) {
                    const html = response.data;
                        resolve(cheerio.load(html)); 
                }
                }, (error) => reject(error) );
        })
    }

    async scrape() {
        const self = this;
        console.log("Scraping");
        try {
            const $ = await this.getPage();
            const existingArticles = this.articles.map(article => article.title);
            let articlesAdded = 0;
            $('.news').each(function() {
                const header = $(this).find('.article-header')
                const title = header.find('h3').text().trim();
                if (existingArticles.indexOf(title) > -1) {
                    return;
                }
                const date = new Date(header.find('time').attr('datetime'));
                const link = header.find('a').attr('href');

                const body = $(this).find('section');
                const description = body.find('p').first().contents().filter(function() {
                    return this.type === 'text';
                }).text();

                self.articles.push({
                    title, date, link, description
                });
                articlesAdded++
            });
            if (articlesAdded > 0) {
                this.articles.sort((a, b) => {
                    return a.date.getTime() - b.date.getTime();
                }).reverse();
                this.onNews.next(this.articles);
            }
        } catch(err) {
            console.log("Failed to get page: ", err);
        }
    }
}