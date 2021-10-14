"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidationErrors = void 0;
const getValidationErrors = (errors) => {
    const arrayOfErrors = [];
    for (let error of errors) {
        const { constraints } = error;
        for (let issue in constraints)
            arrayOfErrors.push(constraints[issue]);
    }
    return arrayOfErrors;
};
exports.getValidationErrors = getValidationErrors;
//# sourceMappingURL=errors.js.map