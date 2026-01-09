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
    description: "Porzione di patatine fritte con salse katchup, majonaise e barbeque",
    imageUrl: "https://www.motopizza2.com/wp-content/uploads/2021/07/90681-1.jpg"
  },
  {
    id: 1002,
    section: "Antipasti",
    label: "Antipasto misto",
    price: 2,
    description: "Porzioni di dalame, guanciale, prociutto cotto, prociutto crudo, grana padano, olive verdi",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=ttbn:ANd9GcSZRQWatOmj8myeEurSoRtkugV1GEw1Hisp6g&usqp=CAU"
  },
  {
    id: 2001,
    section: "Primi",
    label: "Farfallette al salmone",
    price: 8,
    description: "Pasta, salmone affumicato, panna, prezzemolo",
    imageUrl: "https://blog.giallozafferano.it/ilchiccodimais/wp-content/uploads/2019/06/farfalle-al-salmone-affumicato-con-panna-ricetta-facile-e-veloce-il-chicco-di-mais.jpg"
  },
  {
    id: 2002,
    section: "Primi",
    label: "Spaghetti al ragù",
    price: 7.5,
    description: "Pasta, pomodoro, ragù di maiale, carote",
    imageUrl: "https://www.cuocicuoci.com/wp-content/uploads/2022/05/rigatoni-al-ragu.jpg"
  },
  {
    id: 3001,
    section: "Pizze",
    label: "Margherita",
    price: 4,
    description: "Pomodoro, mozzarella, basilico",
    imageUrl: "https://ilfattoalimentare.it/wp-content/uploads/2022/12/Depositphotos_505971914_L-1.jpg"
  },
  {
    id: 3002,
    section: "Pizze",
    label: "Romana",
    price: 6,
    description: "Pomodoro, mozzarella, prociuto cotto",
    imageUrl: "https://www.pizzaontheroad.eu/wp-content/uploads/2019/09/ADL_4586.jpg"
  },
  {
    id: 3003,
    section: "Pizze",
    label: "Diavola",
    price: 7,
    description: "Pomodoro, mozzarella, peperoncino, salame piccante",
    imageUrl: "https://www.silviocicchi.com/pizzachef/wp-content/uploads/2015/03/d1.jpg"
  },
  {
    id: 4001,
    section: "Secondi carne",
    label: "Costolette di maiale",
    price: 8,
    description: "Carne di maiale con salsa teriaki",
    imageUrl: "https://www.fattoincasadabenedetta.it/wp-content/uploads/2022/04/AdobeStock_491302793-1200x900.jpg"
  },
  {
    id: 4002,
    section: "Secondi carne",
    label: "Salsiccia di pollo",
    price: 9,
    description: "Salsiccia di pollo",
    imageUrl: "https://www.donnamoderna.com/content/uploads/2023/05/fac82ee49783838d.jpg"
  },
  {
    id: 5001,
    section: "Secondi pesce",
    label: "Aragosta",
    price: 8,
    description: "Aragosta al forno con limone e olio",
    imageUrl: "https://media-assets.lacucinaitaliana.it/photos/61fac87791ff55922ebd8f79/1:1/w_2560%2Cc_limit/empty"
  },
  {
    id: 5002,
    section: "Secondi pesce",
    label: "Pesce misto",
    price: 9,
    description: "Pesce spada, gamberi e seppie al forno",
    imageUrl: "https://www.alberto-arienti.com/wp-content/uploads/2021/11/Antipasto-di-pesce-1300x975.jpg"
  },
  {
    id: 6001,
    section: "Bibite",
    label: "Acqua naturale",
    price: 2,
    description: "Acqua naturale",
    imageUrl: "https://www.ristorantiweb.com/wp-content/uploads/sites/9/2015/07/SB-Prestige-Rose-Edition.jpg"
  },
  {
    id: 6002,
    section: "Bibite",
    label: "Acqua gassata",
    price: 3,
    description: "Acqua gassata",
    imageUrl: "https://www.ristorantiweb.com/wp-content/uploads/sites/9/2015/07/SB-Prestige-Rose-Edition.jpg"
  },
  {
    id: 6003,
    section: "Bibite",
    label: "Vino rosso",
    price: 9,
    description: "Vino rosso",
    imageUrl: "https://ilcontadino-online.com/3734-large_default/vino-rosso-malvasia-dolce-6-x-075lt-oltrepo-.jpg"
  }
  ]