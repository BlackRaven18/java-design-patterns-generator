import { ReplaceData } from "../types";
import MethodBodyGenerator from "./MethodBodyGenerator";


export default class CodeParamsReplacer {

    private methodBodyGenerator = new MethodBodyGenerator();

    public getReplacedContent(codeWithParams: string, paramsToReplace: ReplaceData[]) {

        let codeWithParamsReplaced = codeWithParams;

        paramsToReplace.forEach((paramToReplace) => {
            if (paramToReplace.value.includes("$")) {
                paramsToReplace.forEach((paramToCheck) => {
                    if (paramToCheck.replace === paramToReplace.value) {

                        let methodsWithBodyAsString
                            = this.methodBodyGenerator
                                .getMethodsWithBodyAsString(paramToCheck.value);

                        codeWithParamsReplaced = codeWithParamsReplaced
                            .replaceAll(paramToReplace.replace, methodsWithBodyAsString);
                    }
                })


            } else {

                if (paramToReplace.value.includes("\n")) {
                    paramToReplace.value = paramToReplace.value.replaceAll("\n", "\n\t");
                }
            }

            codeWithParamsReplaced = codeWithParamsReplaced.replaceAll(paramToReplace.replace, paramToReplace.value);
        })


        return codeWithParamsReplaced;
    }

}