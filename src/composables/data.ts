import { changeCards, handleAmount, handleBackers, handleBookmarking, handleProgress } from "./markUp";
import {AppData, Pledge} from "./types";


const _appData:AppData = {
    bookmarked: false,
    amount: {
        current: 89914,
        total: 100000
    },
    backers: 5007,
    daysLeft: 56,
    pledges: [
        {
            title: "Bamboo Stand",
            about: "You get an ergonomic stand made of natural bamboo. You've helped us launch our promotional campaign, and you'll be added to a special Backer member list. Shipping is included.",
            amountLeft: 101,
            price: 25
        },

        {
            title: "Black Edition Stand",
            about: "You get a Black Special Edition computer stand and a personal thank you. You'll be added to our Backer member list. Shipping is included.",
            amountLeft: 64,
            price: 75
        },


        {
            title: "Mahogany Special Edition",
            about: "You get two Special Edition Mahogany stands, a Backer T-Shirt, and a personal thank you. You'll be added to our Backer member list. Shipping is included",
            amountLeft: 0,
            price: 200
        },


        {
            title: "Pledge With No Reward",
            about: "Choose to support us without a reward if you simply believe in our project. As a backer, you will be signed up to recieve product updates via email",
            amountLeft: 100,
            price: 0
        }



    ]
}



export const appData = new Proxy(_appData, {
    get(obj, p: string) {
        const a = obj as unknown as any
        return a[p]
    },


    set(obj: AppData, p, newVal) {
        if (p === 'bookmarked') {
            handleBookmarking(newVal);
        }

        if ( p === 'pledges' ) {
            changeCards(newVal as Pledge[])
        }


        if (p === 'backers') {
            console.log('chaged backers');
            
            handleBackers(newVal as number)
        }

        if (p === 'amount') {
            if (newVal.current as number > 100000) return false
            console.log(newVal)
            handleAmount(newVal.current as number)
            handleProgress(newVal.current as number)
        }



        return Reflect.set(obj, p, newVal)

    }

})




export const addBacking = (str: string) => {

    const checks = typeof str === "string" && str && (appData.pledges.findIndex(pledge => pledge.title.toLowerCase() === str.trim().toLowerCase()) !== -1)

    if (!checks) return


    appData.pledges = appData.pledges.map(pledge => {

        if (pledge.title.toLowerCase() === str.trim().toLowerCase()) {
            appData.amount = {
                ...appData.amount,
                current: appData.amount.current + pledge.price
            }
            if (pledge.price === 0) {
                return pledge
            }
            const newPledge = {
                ...pledge,
                amountLeft: pledge.amountLeft - 1 
            }
            return newPledge
        }
        return pledge
    })

    appData.backers += 1;



}

const startup = () => {

    appData.amount.current = 89914

}


startup()


export {}