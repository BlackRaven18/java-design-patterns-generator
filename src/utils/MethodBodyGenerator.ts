
export default class MethodBodyGenerator {

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
            methodWithBody = "\t@Override\n\t" + methodSignature + "{\n\n\t}" + "\n\n";
        } else {
            methodWithBody = "\t@Override\n\t" + methodSignature + "{\n\t\treturn null;\n\t}" + "\n\n";
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