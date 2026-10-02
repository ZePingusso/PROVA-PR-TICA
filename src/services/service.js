import { loansModel } from "../models/model.js";

export const loanService = {
    async createLoan(data) {
        const nomeJaExiste = (await loansModel.findAll())
            .some(loan => loan.nomeAluno === data.nomeAluno)
        if (nomeJaExiste) {
            const erro = new Error(
                'Este empréstimo já foi feito'
            )
            erro.status = 409
            throw erro
        }
        return loansModel.create(data)
    },
    async updateLoan (id, data) {
        const loan = await loansModel.findById(id)
        if (!loan) {

            const erro = new Error(
                'Empréstimo não encontrado ou não realizado'
            )

            erro.status = 404

            throw erro
        }
        return loansModel.update(id, data)
    },
    async patchLoan (id, data) {
        const loan = await loansModel.findById(id)
        if (!loan) {
            const erro = new Error(
                'Empréstimo não existe'
            )
            erro.status = 404
            throw erro
        }
        const {
            id: _id,
            devolvidoem: _devolvidoEm,
            ...Emprestimos
        } = data
        Emprestimos.devolvidoem = 
            new Date().toISOString()
            return loansModel.patch(
                id,
                Emprestimos
            )
    },
    async deleteLoan(id) {
        const loan = await loansModel.findById(id)
        if (!loan) {
            const erro = new Error(
                'Empréstimo não encontrado ou não realizado'
            )
            erro.status = 404
            throw erro
        }
        await loansModel.delete(id)
    },
    async softDeleteLoan(id) {
        const saida = await loansModel.findById(id)
        if (saida === null) {
            const erro = new Error(
                'Empréstimo não encontrado ou não reaizado'
            )
            erro.status = 404
            throw erro
        }
        if (saida === 'jáApagado') {
            const erro = new Error(
                'Empréstimo já devolvido'
            )
            erro.status = 409
            throw erro
        }
        return true
    }
}