// Designing architecture for the site


export interface AppData {

    bookmarked: boolean,
    backers: number,
    daysLeft: number
    amount: {
        total: number,
        current: number
    }
    pledges: Pledge[]


}

export interface Pledge {
    
    title: string,
    price: number,
    about: string,
    amountLeft: number
    
}


export {}




