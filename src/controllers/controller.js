import { loansModel } from "../models/model.js";
import { loanService } from "../services/service.js";

export async function listLoans(req, res, next) {
    try {
        const loans = await loansModel.findAll()
        res.json(loans)
    } catch (err) {
        next(err)
    }
}
export async function getLoan(req, res, next) {
    try {
        const loan = await loansModel.findById(
            Number(req.params.id)
        )
        if (!loan) {
            return res.status(404).json({
                erro: 'Empréstimo não encontrado ou não realizado'
            })
        }
        res.json(loan)
    } catch (err) {
        next(err)
    }
}
export async function createLoan(req, res, next) {
    try {
        const { nomeAluno, livro } = req.body || {}
        if (!nomeAluno || typeof nomeAluno !== 'string') {
            return res.status(400).json({
                erro: 'O empréstimo precisa obrigatoriamente do nome do responsável!'
            })
        }
        if (!livro || typeof livro !== 'string') {
            return res.status(400).json({
                erro: 'O empréstimo precisa obrigatoriamente do nome do livro pego!'
            })
        }
        const novo = await loanService.createLoan({
            nomeAluno,
            livro
        })
        res.status(201).json(novo)
    } catch (err) {
        next(err)
    }
}

export async function updateLoan(req, res, next) {
    try {
        const { nomeAluno, livro } = req.body || {}
        if (
            !nomeAluno ||
            typeof nomeAluno !== 'string' ||
            livro === undefined ||
            typeof livro !== 'string'
        ) {
            return res.status(400).json({
                erro: 'nome do aluno e o livro são obrigatórios'
            })
        }
        const loan = await loanService.updateLoan(
            Number(req.params.id),
            {
                nomeAluno,
                livro
            }
        )
        res.json(loan)
    } catch (err) {
        next(err)
    }
}

export async function patchLoan(req, res, next) {
    try {
        const loan = await loanService.patchLoan(
            Number(req.params.id),
            req.body || {}
        )
        res.json(loan)
    } catch (err) {
        next(err)
    }
}

export async function deleteLoan(req, res, next) {
    try {
        await loanService.deleteLoan(
            Number(req.params.id)
        )
        res.status(204).end()
    } catch (err) {
        next(err)
    }
}

export async function softDeleteLoan(req, res, next) {
    try {
        await loanService.softDeleteLoan(
            Number(req.params.id)
        )
        res.status(204).end()
    } catch (err) {
        next(err)
    }
}
