import { addBacking, appData } from "./data";
import { Pledge } from "./types";

const bookmarkEl = document.querySelector('button[data-bookmark]')! as HTMLElement;
const progressEl = document.querySelector('progress')! as HTMLProgressElement;
const totalBackers = document.querySelector('#total-backers')! as HTMLElement;
const totalAmount = document.querySelector('#total-amount')! as HTMLElement;
const aboutEl = document.querySelector('main section.about')! as HTMLElement;
const formModal = document.querySelector('#modal-form')! as HTMLElement
const thanksModal = document.querySelector('#thanks')! as HTMLElement
const closeFormModal = formModal.querySelector('svg')! as SVGElement;
const openMenu = document.querySelector('header .icons svg.closed')! as HTMLElement
const closedMenu = document.querySelector('header .icons svg.open')! as HTMLElement
const headerEl = document.querySelector('header')! as HTMLElement;

openMenu.addEventListener('click', _ => {
    headerEl.classList.add('open')
})

closedMenu.addEventListener('click', _ => {
    headerEl.classList.remove('open')
})

const modals = Array.from(document.querySelectorAll('.modal'))! as HTMLElement[]

const formatPrice = (p: number) => {

    const l = String(p).length
    return [...String(p).split('').splice(0, l-3), ',', ...String(p).split('').splice(l-3)].join('')

}


export const changeCards = (cards: Pledge[] = []) => {

    Array.from(aboutEl.querySelectorAll('.card')! as NodeListOf<HTMLElement>).forEach(card => {

        const title = card.querySelector('h3')!.textContent || '';
        const index = cards.findIndex(card => card.title.toLowerCase() === title.toLowerCase());
        if (index === -1) {return}
        const strong = card.querySelector('strong')



        if (strong) {
            strong.innerHTML = `${cards[index].amountLeft}<span>left</span>`
        } 
        

    })

    Array.from(formModal.querySelectorAll('.card-modal')! as NodeListOf<HTMLElement>).forEach(card => {

        const title = card.querySelector('h3')!.textContent || '';
        const index = cards.findIndex(card => card.title.toLowerCase() === title.toLowerCase());
        if (index === -1) {return}
        const strong = card.querySelector('strong')



        if (strong) {
            strong.innerHTML = `${cards[index].amountLeft}<span>left</span>`
        } 
        

    })



}


export const handleProgress = (currentAmount: number) => {

    const percent = Math.floor((currentAmount/appData.amount.total) * 100)
    progressEl.value = percent
    progressEl.innerHTML = `${progressEl.value}%`

}

export const handleBackers = (currentBackers: number) => {
    totalBackers.innerHTML = `
    <strong>${currentBackers}</strong>
    <span>total backers</span>
    `
}

export const handleAmount = (currentAmount: number) => {
    totalAmount.innerHTML = `
    <strong>${formatPrice(currentAmount)}</strong>
    <span>of $100,000 backed</span>
    `
}

export const handleBookmarking = (bookmark: boolean) => {
    bookmarkEl.classList.remove('bookmarked');
    if (bookmark) bookmarkEl.classList.add('bookmarked');
}


const removeModals = () => {
    modals.forEach(modal => modal.classList.remove('active'))
}



const listen = () => {
    bookmarkEl.addEventListener('click', () => {appData.bookmarked = !appData.bookmarked})    



    aboutEl.addEventListener('click', (e) => {
        const el = e.target! as unknown as HTMLElement
        if (el.tagName.toLowerCase() !== 'button') return
        removeModals()
        formModal.classList.add('active');
    })


    closeFormModal.addEventListener('click', () => {
        removeModals()
    })



    formModal.addEventListener('click', (e) => {
        const el = e.target! as unknown as HTMLElement
        const checks = (el.tagName.toLowerCase() === 'span') && (typeof el.dataset?.checkbox === 'string')
        if (!checks) return
        const title = el.closest('.card-modal')!.querySelector('h3')!.textContent
        addBacking(title!)
        removeModals()
        thanksModal.classList.add('active')
    })
    

    thanksModal.addEventListener('click', (e) => {
        const el = e.target! as unknown as HTMLElement
        const checks = (el.tagName.toLowerCase() === 'button');

        if (!checks) return

        removeModals()

        
    })


}

removeModals()
listen()


export {}
