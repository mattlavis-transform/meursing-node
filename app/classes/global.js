global.get_starch_glucose_options = function () {
    var meursing_codes = require('../data/meursing_codes.json');
    var starch_glucose_options = [];

    for (key in meursing_codes) {
        var value = meursing_codes[key].starch;
        if (!starch_glucose_options.includes(value)) {
            starch_glucose_options.push(value);
        }
        var a = 1;
    }
    // starch_glucose_options.sort();
    return (starch_glucose_options);
}

global.get_sucrose_options = function (starch_option) {
    var meursing_codes = require('../data/meursing_codes.json');
    var sucrose_options = [];

    for (key in meursing_codes) {
        var starch_value = meursing_codes[key].starch;
        if (starch_value == starch_option) {
            var sucrose_value = meursing_codes[key].sucrose;
            if (!sucrose_options.includes(sucrose_value)) {
                sucrose_options.push(sucrose_value);
            }
        }
    }
    // sucrose_options.sort();
    return (sucrose_options);
}

global.get_milk_fat_options = function (starch_option, sucrose_option) {
    var meursing_codes = require('../data/meursing_codes.json');
    
    var milk_fat_options = [];

    for (key in meursing_codes) {
        var starch_value = meursing_codes[key].starch;
        var sucrose_value = meursing_codes[key].sucrose;
        if (starch_value == starch_option) {
            if (sucrose_value == sucrose_option) {
                var milk_fat_value = meursing_codes[key].milk_fat;
                if (!milk_fat_options.includes(milk_fat_value)) {
                    milk_fat_options.push(milk_fat_value);
                }
            }
        }
    }
    // milk_fat_options.sort();
    return (milk_fat_options);
}

global.get_milk_protein_options = function (starch_option, sucrose_option, milk_fat_option) {
    var meursing_codes = require('../data/meursing_codes.json');
    var milk_protein_options = [];

    for (key in meursing_codes) {
        var starch_value = meursing_codes[key].starch;
        var sucrose_value = meursing_codes[key].sucrose;
        var milk_fat_value = meursing_codes[key].milk_fat;
        if (starch_value == starch_option) {
            if (sucrose_value == sucrose_option) {
                if (milk_fat_value == milk_fat_option) {
                    var milk_protein_value = meursing_codes[key].milk_protein;
                    if (!milk_protein_options.includes(milk_protein_value)) {
                        milk_protein_options.push(milk_protein_value);
                    }
                }
            }
        }
    }
    // milk_protein_options.sort();
    return (milk_protein_options);
}

global.get_result = function (starch_option, sucrose_option, milk_fat_option, milk_protein_option) {
    var meursing_codes = require('../data/meursing_codes.json');
    var results = [];

    for (key in meursing_codes) {
        var starch_value = meursing_codes[key].starch;
        var sucrose_value = meursing_codes[key].sucrose;
        var milk_fat_value = meursing_codes[key].milk_fat;
        var milk_protein_value = meursing_codes[key].milk_protein;

        if (starch_value == starch_option) {
            if (sucrose_value == sucrose_option) {
                if (milk_fat_value == milk_fat_option) {
                    if (milk_protein_value == milk_protein_option) {
                        var result = key.replace("key_", "");
                        if (!results.includes(result)) {
                            results.push(result);
                        }
                    }
                }
            }
        }
    }
    return (results);
}


/* VALIDATIONS START HERE */
// Validate starch
global.validate_starch = function (req, res) {
    return (true);
}