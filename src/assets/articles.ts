export interface Article{
  id:number
  section: string
  label:string
  price:number
  description:string
  imageUrl:string
}

export const articles :Article[] =[
  {
    id: 1001,
    section: "Antipasti",
    label: "Patatine",
    price: 2,
    description: "Patatine fritte con salse ketchup, maionese e barbecue",
    imageUrl: "/articles/article-patatine.jpg"
  },
  {
    id: 1002,
    section: "Antipasti",
    label: "Antipasto misto",
    price: 2,
    description: "Assortimento di salumi: salame, guanciale, prosciutto cotto, prosciutto crudo, grana padano e olive verdi",
    imageUrl: "/articles/article-mix-antipasto.jpg"
  },
  {
    id: 2001,
    section: "Primi",
    label: "Farfalle al salmone",
    price: 8,
    description: "Pasta farfalle con salmone affumicato, panna e prezzemolo",
    imageUrl: "/articles/article-farfalle-salmone.jpg"
  },
  {
    id: 2002,
    section: "Primi",
    label: "Maccheroni al ragù",
    price: 7.5,
    description: "Pasta con ragù di maiale, pomodoro e carote",
    imageUrl: "/articles/article-maccheroni-ragu.jpg"
  },
  {
    id: 3001,
    section: "Pizze",
    label: "Margherita",
    price: 4,
    description: "Pizza classica con pomodoro, mozzarella e basilico",
    imageUrl: "/articles/article-margherita-pizza.jpg"
  },
  {
    id: 3002,
    section: "Pizze",
    label: "Romana",
    price: 6,
    description: "Pizza con pomodoro, mozzarella e prosciutto cotto",
    imageUrl: "/articles/article-romana-pizza.jpg"
  },
  {
    id: 3003,
    section: "Pizze",
    label: "Diavola",
    price: 7,
    description: "Pizza piccante con pomodoro, mozzarella, peperoncino e salame piccante",
    imageUrl: "/articles/article-diavola-pizza.jpg"
  },
  {
    id: 4001,
    section: "Secondi carne",
    label: "Costolette di maiale",
    price: 8,
    description: "Costolette di maiale grigliate con salsa teriyaki",
    imageUrl: "/articles/article-costolette.jpg"
  },
  {
    id: 4002,
    section: "Secondi carne",
    label: "Salsiccia di pollo",
    price: 9,
    description: "Salsiccia di pollo alla griglia",
    imageUrl: "/articles/article-sausages.jpg"
  },
  {
    id: 5001,
    section: "Secondi pesce",
    label: "Aragosta",
    price: 8,
    description: "Aragosta al forno con limone e olio d'oliva",
    imageUrl: "/articles/article-aragosta.jpg"
  },
  {
    id: 5002,
    section: "Secondi pesce",
    label: "Pesce misto",
    price: 9,
    description: "Assortimento di pesce spada, gamberi e seppie al forno",
    imageUrl: "/articles/article-mix-pesce.jpg"
  },
  {
    id: 6001,
    section: "Bibite",
    label: "Acqua naturale",
    price: 2,
    description: "Acqua naturale in bottiglia",
    imageUrl: "/articles/article-san-benedetto-acqua.jpg"
  },
  {
    id: 6002,
    section: "Bibite",
    label: "Acqua gassata",
    price: 3,
    description: "Acqua frizzante in bottiglia",
    imageUrl: "/articles/article-san-benedetto-acqua.jpg"
  },
  {
    id: 6003,
    section: "Bibite",
    label: "Vino rosso",
    price: 9,
    description: "Vino rosso di qualità",
    imageUrl: "/articles/article-malvasia-vino.webp"
  }
  ]