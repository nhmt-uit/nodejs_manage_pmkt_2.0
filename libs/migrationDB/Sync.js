import SyncAccount from "./SyncAccount"
import SyncBanker from "./SyncBanker"
import SyncFormula from "./SyncFormula"
import SyncUser from "./SyncUser"
import SyncCurrency from "./SyncCurrency"
import SyncLanguage from "./SyncLanguage"

<<<<<<< HEAD
import FormulaGroupsModel_N from "./model/FormulaGroupsModel_N"
=======

const _limit = process.argv[2] || 100
const _skip = process.argv[3] || 0
const _maxSkip = process.argv[4]


import FormulaGroupsModel_N from "./model/FormulaGroupsModel_N"
import FormulasModel_N from "./model/FormulasModel_N"

>>>>>>> 2e78bd2bd0bfe107095f0fb6212a14ddd187d104

FormulaGroupsModel_N
.findOne({_id: "5cb14d67a8c0f04080780bcf"})
.populate({
    model: "formulas",
    path: "formulas",
    select: "_id name banker_id",
    populate: {
        model: "bankers",
        path: "banker_id",
    }
})
.exec((err, res) => {
<<<<<<< HEAD
    console.log(res.formulas[0].banker_id._id)
})


// const _limit = process.argv[2] || 100
// const _skip = process.argv[3] || 0
// const _maxSkip = process.argv[4]

// Promise.all([
//     // Sync users
//     SyncUser.Users(_limit, _skip, _maxSkip),

//     // Sync currencies
//     // SyncCurrency.MCurrency(_limit, _skip, _maxSkip),
//     // SyncCurrency.TCurrency(_limit, _skip, _maxSkip),

//     // // Sync bankers
//     // SyncBanker.Book(_limit, _skip, _maxSkip),
//     // SyncBanker.Banker(_limit, _skip, _maxSkip),

//     // // Sync accounts
//     // SyncAccount.Account(_limit, _skip, _maxSkip),
//     // SyncAccount.AccountFormula(_limit, _skip, _maxSkip),

//     // // Sync formula
//     // SyncFormula.FormulaField(_limit, _skip, _maxSkip),
//     // SyncFormula.FormulaFormat(_limit, _skip, _maxSkip),
//     // SyncFormula.Formula(_limit, _skip, _maxSkip),
//     // SyncFormula.FormulaGroup(_limit, _skip, _maxSkip),

//     // // Sync Language
//     // SyncLanguage.Language(_limit, _skip, _maxSkip),
//     // SyncLanguage.Notice(_limit, _skip, _maxSkip),
// ]).then(_ => {
//     console.log("===================== Migration Data Done ================================")
// })
=======
    console.log(res)
})
console.log("dd")


/*



Promise.all([
    // Sync users
    SyncUser.Users(_limit, _skip, _maxSkip),

    // Sync currencies
    // SyncCurrency.MCurrency(_limit, _skip, _maxSkip),
    // SyncCurrency.TCurrency(_limit, _skip, _maxSkip),

    // // Sync bankers
    // SyncBanker.Book(_limit, _skip, _maxSkip),
    // SyncBanker.Banker(_limit, _skip, _maxSkip),

    // // Sync accounts
    // SyncAccount.Account(_limit, _skip, _maxSkip),
    // SyncAccount.AccountFormula(_limit, _skip, _maxSkip),

    // // Sync formula
    // SyncFormula.FormulaField(_limit, _skip, _maxSkip),
    // SyncFormula.FormulaFormat(_limit, _skip, _maxSkip),
    // SyncFormula.Formula(_limit, _skip, _maxSkip),
    // SyncFormula.FormulaGroup(_limit, _skip, _maxSkip),

    // // Sync Language
    // SyncLanguage.Language(_limit, _skip, _maxSkip),
    // SyncLanguage.Notice(_limit, _skip, _maxSkip),
]).then(_ => {
    console.log("===================== Migration Data Done ================================")
})

*/
>>>>>>> 2e78bd2bd0bfe107095f0fb6212a14ddd187d104
