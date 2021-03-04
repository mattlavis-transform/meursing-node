const express = require('express')
const router = express.Router()
require('./classes/global.js');


// Add your routes here - above the module.exports line

// Starch and glucode content
router.get(['/starch-glucose'], function (req, res) {
    var error = req.query["error"];
    starch_glucose_options = global.get_starch_glucose_options();
    res.render('01_starch_glucose', { "starch_glucose_options": starch_glucose_options, "error": error });
});

// Sucrose, invert sugar or isoglucose
router.get(['/sucrose-sugar-isoglucose'], function (req, res) {
    var error = req.query["error"];
    var starch_option = req.session.data["starch"];
    sucrose_options = global.get_sucrose_options(starch_option);
    res.render('02_sucrose', { "sucrose_options": sucrose_options, "error": error });
});

// Milk fat
router.get(['/milk-fat'], function (req, res) {
    var error = req.query["error"];
    var starch_option = req.session.data["starch"];
    var sucrose_option = req.session.data["sucrose"];
    milk_fat_options = global.get_milk_fat_options(starch_option, sucrose_option);
    console.log(milk_fat_options);
    res.render('03_milk_fat', { "milk_fat_options": milk_fat_options, "error": error });
});

// Milk protein
router.get(['/milk-protein'], function (req, res) {
    var error = req.query["error"];
    var starch_option = req.session.data["starch"];
    var sucrose_option = req.session.data["sucrose"];
    var milk_fat_option = req.session.data["milk_fat"];

    milk_protein_options = global.get_milk_protein_options(starch_option, sucrose_option, milk_fat_option);
    console.log(milk_protein_options);
    res.render('04_milk_protein', { "milk_protein_options": milk_protein_options, "error": error });
});

// Data handler
router.get(['/data'], function (req, res) {
    var a = 1;
    var page = req.query["page"];
    switch (page) {
        case "starch-glucose":
            var starch_option = req.query["starch"];
            if ((starch_option == "") || (starch_option == null)) {
                res.redirect("/starch-glucose?error=true");
            }
            else {
                res.redirect("/sucrose-sugar-isoglucose");
            }
            break;
        case "sucrose":
            var sucrose_option = req.query["sucrose"];
            if ((sucrose_option == "") || (sucrose_option == null)) {
                res.redirect("/sucrose-sugar-isoglucose?error=true");
            }
            else {
                res.redirect("/milk-fat");
            }

            break;
        case "milk_fat":
            var milk_fat_option = req.query["milk_fat"];
            if ((milk_fat_option == "") || (milk_fat_option == null)) {
                res.redirect("/milk-fat?error=true");
            }
            else {
                var no_protein = [
                    '40 - 54.99',
                    '55 - 69.99',
                    '70 - 84.99',
                    '85 or more'
                ]
                if (no_protein.includes(milk_fat_option)) {
                    res.redirect("/check-answers");
                } else {
                    res.redirect("/milk-protein");
                }
            }

            break;
        case "milk_protein":
            var milk_protein_option = req.query["milk_protein"];
            if ((milk_protein_option == "") || (milk_protein_option == null)) {
                res.redirect("/milk-protein?error=true");
            }
            else {
                res.redirect("/check-answers");
            }

            break;
    }

});

// Check answers
router.get(['/check-answers'], function (req, res) {
    res.render('05_check_answers');
});

// Results
router.get(['/results'], function (req, res) {
    var starch_option = req.session.data["starch"];
    var sucrose_option = req.session.data["sucrose"];
    var milk_fat_option = req.session.data["milk_fat"];
    var milk_protein_option = req.session.data["milk_protein"];

    results = global.get_result(starch_option, sucrose_option, milk_fat_option, milk_protein_option);
    res.render('06_results', { "results": results });
});

// Restart
router.get(['/restart'], function (req, res) {
    req.session.data["starch"] = null;
    req.session.data["sucrose"] = null;
    req.session.data["milk_fat"] = null;
    req.session.data["milk_protein"] = null;
    res.redirect('/starch-glucose');
});


module.exports = router
