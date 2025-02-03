"use strict";
var statesNames;
(function (statesNames) {
    statesNames["popup"] = "popup";
})(statesNames || (statesNames = {}));
class ElementHandler {
    static createElement(tag, attributes = [], classes = [], styles = []) {
        let newElement = document.createElement(tag);
        //attributes
        for (let attribute of attributes) {
            newElement.setAttribute(attribute.key, attribute.value);
        }
        //classes
        for (let className of classes) {
            newElement.classList.add(className);
        }
        //style rules
        newElement = this.addRuleSet(newElement, styles);
        return newElement;
    }
    static getRuleSet(element) {
        let ruleSet = element.getAttribute("style");
        let output = [];
        if (ruleSet) {
            let ruleSetArray = ruleSet.split(";");
            for (let rule of ruleSetArray) {
                rule = rule.trim();
                let subRule = rule.split(":");
                let attribute = {
                    key: subRule[0].trim(),
                    value: subRule[1].trim()
                };
                output.push(attribute);
            }
        }
        return output;
    }
    static setRuleSet(element, ruleSetArray = []) {
        let ruleSet = "";
        for (let rule of ruleSetArray) {
            ruleSet += rule.key + ': ' + rule.value + '; ';
        }
        element.setAttribute("style", ruleSet);
        return element;
    }
    static addRuleSet(element, styles = []) {
        let ruleSet = "";
        let ruleSetArray = this.getRuleSet(element);
        for (let rule of styles) {
            const searchBy = function searchArrtibute(value) {
                return value.key === rule.key;
            };
            let indexOfKey = ruleSetArray.findIndex(searchBy);
            if (indexOfKey != -1) {
                // if rule exists warn and apply it
                console.warn(rule, " is already in ruleset of element ", element, " the data is overwritten now.\nIf this was intended, use changeRuleSet instead.");
                ruleSetArray.splice(indexOfKey, 1);
            }
            ruleSetArray.push(rule);
        }
        element = this.setRuleSet(element, ruleSetArray);
        return element;
    }
    static changeRuleSet(element, styles = []) {
        let ruleSet = "";
        let ruleSetArray = this.getRuleSet(element);
        for (let rule of styles) {
            const searchBy = function searchArrtibute(value) {
                return value.key === rule.key;
            };
            let indexOfKey = ruleSetArray.findIndex(searchBy);
            if (indexOfKey == -1) {
                // if rule not exists warn and add new rule
                console.warn(rule, " is not in the ruleset of element ", element, " the new rule has been added instead of changing it now.\nIf this was intended, use addRuleSet instead.");
            }
            if (indexOfKey != -1) {
                ruleSetArray.splice(indexOfKey, 1);
            }
            ruleSetArray.push(rule);
        }
        element = this.setRuleSet(element, ruleSetArray);
        return element;
    }
}
class UI {
    static stateChanged = false;
    static stateChangedArray;
    static render() {
        if (this.stateChanged) {
            for (let [key, state] of this.stateChangedArray) {
                if (state.changed) {
                    state.method();
                    console.log(key, " is updated.");
                }
            }
            this.stateChanged = false;
        }
    }
    static updatePopUp() {
        // handle pop-ups
        let popElements = Array.from(document.querySelectorAll(".add-pop-up"));
        for (let element of popElements) {
            let canvas = ElementHandler.createElement("div");
            let children = Array.from(element.childNodes);
            for (let child of children) {
                let innerCanvas = ElementHandler.createElement("div");
                innerCanvas.appendChild(child.cloneNode(true));
                canvas.appendChild(innerCanvas);
            }
            for (let child of children) {
                element.removeChild(child);
            }
            element.appendChild(canvas);
            element.classList.remove("add-pop-up");
            element.classList.remove("not-pop-up");
            element.classList.add("pop-up");
        }
        // handle not-pop-ups
        let notPopElements = Array.from(document.querySelectorAll(".remove-pop-up"));
        for (let element of notPopElements) {
            let originalChildren = Array.from(element.querySelectorAll(".pop-up > div > div"));
            let children = Array.from(element.childNodes);
            for (let child of children) {
                element.removeChild(child);
            }
            for (let child of originalChildren) {
                let grandChildren = Array.from(child.childNodes);
                for (let grandChild of grandChildren) {
                    element.appendChild(grandChild.cloneNode(true));
                }
            }
            element.classList.remove("remove-pop-up");
            element.classList.remove("pop-up");
            element.classList.add("not-pop-up");
        }
    }
    static switchPopUp(element) {
        if (element.parentElement?.parentElement?.parentElement?.classList.contains("pop-up")) {
            element.parentElement?.parentElement?.parentElement?.classList.add("remove-pop-up");
        }
        else {
            element.parentElement?.classList.add("add-pop-up");
        }
        let popupHandler = UI.stateChangedArray.get(statesNames.popup);
        // update flags
        if (popupHandler) {
            popupHandler.changed = true;
        }
        else {
            let popupState = { changed: true, method: UI.updatePopUp };
            UI.stateChangedArray.set(statesNames.popup, popupState);
        }
        UI.stateChanged = true;
    }
}
// configure UI system
let mainLoop = setInterval(UI.render.bind(UI), 60);
UI.stateChangedArray = new Map();
// add popup state tracker
let popupState = { changed: false, method: UI.updatePopUp };
UI.stateChangedArray.set(statesNames.popup, popupState);
