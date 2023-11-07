import { MethodGeneratorConfig, ReturnTypeInfo } from "../types";

export default class MethodBodyGenerator {

    private getMiddleWord(text: string, beginWord: string, endWord: string): string {
        const beginWordIndes = text.indexOf(beginWord);
        const endWordIndex = text.indexOf(endWord);
    
        if (beginWordIndes !== -1 && endWordIndex !== -1 && endWordIndex > beginWordIndes) {
            const fragment = text.substring(beginWordIndes + beginWord.length, endWordIndex);
            return fragment.trim();
        } else {
            return "";
        }
    }

    public generateMethod(methodGeneratorConfig: MethodGeneratorConfig, methodHeader: string) {

        let methodWithBody = "";
    
        let methodName = "";
        let accessType = methodGeneratorConfig.generatePatterns[0].defaultAccessType;
        let returnTypeInfo: ReturnTypeInfo = {
            returnType: "",
            shouldReturn: ""
        }
        

    
        methodGeneratorConfig.generatePatterns[0].accessTypes.forEach(supportedAccessType => {
            if (methodHeader.indexOf(supportedAccessType) !== -1) {
                accessType = supportedAccessType;
            }
        })
    
        methodGeneratorConfig.generatePatterns[0].returnTypes.forEach(supportedReturnType => {
            if (methodHeader.indexOf(supportedReturnType.returnType) !== -1) {
                returnTypeInfo = supportedReturnType;
            }
        })

        console.log(returnTypeInfo)

        
    
        if (returnTypeInfo.returnType.length > 0) {
            
    
            methodName = this.getMiddleWord(methodHeader, returnTypeInfo.returnType, "(")
            let replaceData = [
                {
                    replace: "$ACCESS_TYPE$",
                    value: accessType
                },
                {
                    replace: "$RETURN_TYPE$",
                    value: returnTypeInfo.returnType
                },
                {
                    replace: "$RETURN_TYPE_VALUE$",
                    value: returnTypeInfo.shouldReturn
                },
                {
                    replace: "$NAME$",
                    value: methodName
                }
            ]
    
            methodWithBody = methodGeneratorConfig.generatePatterns[0].bodyTemplate;
    
            replaceData.forEach(data => {
                methodWithBody = methodWithBody.replaceAll(data.replace, data.value);
            })


    
        }
        //console.log(methodWithBody);
        return methodWithBody;
    }

    public getMethodsHeaders = (methodsSignaturesSeparatedWithNewLineSign: string) => {

        let methodHeaders = methodsSignaturesSeparatedWithNewLineSign.split("\n");
        let trimedMethodHeadersWithNoSemicolons = methodHeaders.map(
            methodHeader => methodHeader.trim().replaceAll(";", "")
        );

        return trimedMethodHeadersWithNoSemicolons;
    }

    // public getMethodWithBody = (methodSignature: string) => {
    //     let methodWithBody = "";

    //     if (methodSignature.includes("void")) {
    //         methodWithBody = "\t@Override\n\t" + methodSignature + "{\n\n\t}\n\n";
    //     } else {
    //         methodWithBody = "\t@Override\n\t" + methodSignature + "{\n\t\treturn null;\n\t}\n\n";
    //     }

    //     return methodWithBody;
    // }

    // public getMethodsWithBodyAsString = (methodsSignaturesSeparatedWithNewLineSign: string) => {
    //     let methodsHeaders = this.getMethodsHeaders(methodsSignaturesSeparatedWithNewLineSign);

    //     let methodsWithBodyAsString = "";

    //     methodsHeaders.forEach(methodSignature => {
    //         methodsWithBodyAsString += this.getMethodWithBody(methodSignature);
    //     })

    //     return methodsWithBodyAsString;
    
    // }

}