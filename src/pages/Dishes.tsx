import React, { useMemo } from 'react';
import { articles } from '../assets/articles';
import { Counter } from '../shared/Counter';
import type { Article } from '../interfaces/apis';

export function Dishes() {
  // Sposta document.title in useEffect per seguire best practice
  React.useEffect(() => {
    document.title = 'Piatti';
  }, []);
 
  function getArticles() :(Article & { icon: string })[] {
    const ordine =['antipasti', 'primi', 'pizze', 'secondi carne', 'secondi pesce', 'bibite'];
    // Ordina gli articoli in base all'ordine specificato
    const sortedArticles = [...articles].sort((a, b) => {
      const indexA = ordine.indexOf(a.section.toLowerCase());
      const indexB = ordine.indexOf(b.section.toLowerCase());
      return indexA - indexB;
    });
    
    // Aggiungi la proprietà icon a ogni articolo
    return sortedArticles.map(article => ({
      ...article,
      icon: getIconForArticle(article)
    }));
  }
  
  // Funzione per determinare l'icona in base al tipo di articolo
  function getIconForArticle(article: Article) {
    const section = article.section.toLowerCase();
    
    if (section === 'antipasti') return 'bi-cup-straw';
    if (section === 'primi') return 'bi-bowl-steam';
    if (section === 'pizze') return 'bi-pizza';
    if (section === 'secondi carne') return 'bi-knife';
    if (section === 'secondi pesce') return 'bi-fish';
    if (section === 'bibite') return 'bi-cup-hot';
    
    return 'bi-utensils'; // Icona predefinita
  }

  // Variabile reattiva con le sezioni uniche degli articoli
  const sections = useMemo(() => {
    return Array.from(new Set(getArticles().map(article => article.section)));
  }, [articles]);

  return(
    <article id="Dishes" className="container p-0 max-w-400px" lang="it" role="article">
      <header className="p-3 mb-3 text-bg-primary shadow" role="banner">
        <h1 className="m-0">Menu Ristorante</h1>
      </header>

      <main role="main">
        <div className="m-3">
          <h2>Il Nostro Menu</h2>
          <p>Scopri tutte le nostre prelibatezze organizzate per categoria</p>
        </div>
        
        {/* Summary navigation */}
        <h2 className="m-3">Categorie</h2>
        <div className="d-grid gap-1 cols-auto-1fr-auto align-items-center">
          <i className="bi bi-caret-left-fill"></i>
          <div className="d-flex gap-2 overflow-x-auto" 
               style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            {sections.map((section, index) => (
              <a key={index}
                 href={`#section-${section}`}
                 className="btn btn-secondary flex-shrink-0"
                 role="button">
                {section}
              </a>
            ))}
          </div>
          <i className="bi bi-caret-right-fill"></i>
        </div>

        {/* Menu sections */}
        <div className="d-flex flex-wrap gap-2" role="list">
          {getArticles().map((article, i, _articles) => (
            <React.Fragment key={i}>
              {/* Mostra l'intestazione se è il primo articolo della categoria o se la categoria cambia */}
              {(i === 0 || article.section !== _articles[i - 1].section) && 
                <h3 className='p-3 m-0 text-bg-c1 w-100 sticky-top z-1' 
                    id={`section-${article.section}`}>
                  <span className={"me-2 bi "+ article.icon}></span>
                  <span>{article.section}</span>
                </h3>
              }

              <div className="mx-2 border rounded flex-auto position-relative shadow" 
                   role="listitem" aria-labelledby={`article-${article.id}`}>
                <h4 className='p-3 m-0 d-flex gap-2' id={`article-${article.id}`}>
                  <span className="me-2">{article.price}€</span>
                  <span>{article.label}</span>
                </h4>

                <figure className='m-0'>
                  <img src={article.imageUrl} alt={`Immagine di ${article.label}`} 
                       className='img-fluid object-fit-cover max-h-200px w-100'
                       loading="lazy"/>
                </figure>

                <div className='p-3'>
                  <div>{article.description}</div>
                </div>

                <Counter articleId={article.id} />
              </div>
            </React.Fragment>
          ))}
        </div>
      </main>

    </article>
  )
}