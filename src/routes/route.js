import { Router } from 'express'
import {
    listLoans,
    getLoan,
    createLoan,
    updateLoan,
    patchLoan,
    deleteLoan,
    softDeleteLoan
} from '../controllers/controller.js'

const router = Router()

router.get('/', listLoans)
router.get('/:id', getLoan)
router.post('/', createLoan)
router.put('/:id', updateLoan)
router.patch('/:id', patchLoan)
router.delete('/:id', deleteLoan)
router.delete('/:id/soft', softDeleteLoan)

export default router