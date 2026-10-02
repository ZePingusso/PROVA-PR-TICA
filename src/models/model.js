import { readLoans, writeLoans } from "../db.js";
// loans é empréstimos em inglês

export const loansModel = {
    async findAll() {
        return (await readLoans())
        .filter(loan => !loan.deletedAt)
    },
    async findById (id) {
        const loan = (await readLoans())
            .find(loan =>
                loan.id === id &&
                !loan.deletedAt
            )
        return loan || null
    },
        async create(data) {
        const loans = await readLoans()
        const id = loans.length
            ? Math.max(...loans.map(loan => loan.id)) + 1
            : 1
        const novo = {
            id,
            ...data
        }
        loans.push(novo)
        await writeLoans(loans)
        return novo
    },
        async update(id, data) {
        const loans = await readLoans()
        const index = loans.findIndex(
            loan =>
                loan.id === id &&
                !loan.deletedAt
        )
        if (index === -1) {
            return null
        }
        loans[index] = {
            id,
            ...data
        }
        await writeLoans(loans)
        return loans[index]
    },
        async patch(id, data) {
        const loans = await readLoans()
        const loan = loans.find(
            loan =>
                loan.id === id &&
                !loan.deletedAt
        )
        if (!loan) {
            return null
        }
        Object.assign(loan, data)
        await writeLoans(loans)
        return loan
    },
    async delete(id) {
        const loans = await readLoans()
        const index = loans.findIndex(
            loan =>
                loan.id === id &&
                !loan.deletedAt
        )
        if (index === -1) {
            return null
        }
        loans.splice(index, 1)
        await writeLoans(loans)
        return true
    },
    async softDelete(id) {
        const loans = await readLoans()
        const loan = loans.find(
            loan => loan.id === id
        )
        if (!loan) {
            return null
        }
        if (loan.deletedAt) {
            return 'jáApagado'
        }
        loan.deletedAt = new Date().toISOString()
        await writeLoans(loans)
        return true
    }
}