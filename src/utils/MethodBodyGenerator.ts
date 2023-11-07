import { MethodGeneratorConfig } from "../types";

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

        // const generateMethodConfig = {
        //     generateMethods: [
        //         {
        //             language: "java",
        //             accessTypes: [
        //                 "public",
        //                 "private",
        //                 "protected"
        //             ],
        //             returnTypes: [
        //                 "void",
        //                 "int",
        //                 "long"
        //             ],
        //             bodyTemplate: "$ACCESS_TYPE$ $RETURN_TYPE$ $NAME$(){\n\treturn $ACCESS_TYPE$;\n}",
        //         },
        //         {
        //             language: "c#",
        //             accessTypes: [
        //                 "public",
        //                 "private",
        //                 "protected"
        //             ],
        //             returnTypes: [
        //                 "void",
        //                 "int",
        //                 "long"
        //             ],
        //             bodyTemplate: "$ACCESS_TYPE$ $RETURN_TYPE$ $NAME$(){\n\treturn $ACCESS_TYPE$;\n\t}",
        //         },
        //     ]
        // }
    
        //let methodHeader = "public void main();";
        let methodWithBody = "";
    
        let accessType = "";
        let returnType = "";
        let methodName = "";

    
        methodGeneratorConfig.generatePatterns[0].accessTypes.forEach(supportedAccessType => {
            if (methodHeader.indexOf(supportedAccessType) !== -1) {
                accessType = supportedAccessType;
            }
        })
    
        methodGeneratorConfig.generatePatterns[0].returnTypes.forEach(supportedReturnType => {
            if (methodHeader.indexOf(supportedReturnType) !== -1) {
                returnType = supportedReturnType;
            }
        })

        console.log(returnType)

        
    
        if (accessType.length > 0 && returnType.length > 0) {
            
    
            methodName = this.getMiddleWord(methodHeader, returnType, "(")
            let replaceData = [
                {
                    replace: "$ACCESS_TYPE$",
                    value: accessType
                },
                {
                    replace: "$RETURN_TYPE$",
                    value: returnType
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

    public getMethodWithBody = (methodSignature: string) => {
        let methodWithBody = "";

        if (methodSignature.includes("void")) {
            methodWithBody = "\t@Override\n\t" + methodSignature + "{\n\n\t}\n\n";
        } else {
            methodWithBody = "\t@Override\n\t" + methodSignature + "{\n\t\treturn null;\n\t}\n\n";
        }

        return methodWithBody;
    }

    public getMethodsWithBodyAsString = (methodsSignaturesSeparatedWithNewLineSign: string) => {
        let methodsHeaders = this.getMethodsHeaders(methodsSignaturesSeparatedWithNewLineSign);

        let methodsWithBodyAsString = "";

        methodsHeaders.forEach(methodSignature => {
            methodsWithBodyAsString += this.getMethodWithBody(methodSignature);
        })

        return methodsWithBodyAsString;
    
    }

}