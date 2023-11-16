import { MethodGeneratorConfig } from "../types";
import MethodBodyGenerator from "./MethodBodyGenerator";


describe('MethodBodyGenerator', () => {

    it('should return the middle word', () => {
        let methodBodyGenerator = new MethodBodyGenerator();
        const result = methodBodyGenerator.getMiddleWord("BEGIN middle END", "BEGIN", "END")
        expect(result).toBe("middle");
    });

    it('should return empty string when begin argument is incorrect', () => {
        let methodBodyGenerator = new MethodBodyGenerator();
        const result = methodBodyGenerator.getMiddleWord("BEGIN middle END", "NOTBEGIN", "END")
        expect(result).toBe("");
    });

    it('should return empty string when end argument is incorrect', () => {
        let methodBodyGenerator = new MethodBodyGenerator();
        const result = methodBodyGenerator.getMiddleWord("BEGIN middle END", "BEGIN", "NOTEND")
        expect(result).toBe("");
    });

    it('should return unsupported params warning', () => {
        let methodBodyGenerator = new MethodBodyGenerator;

        let methodGeneratorConfig: MethodGeneratorConfig = {
            generatePatterns: [
                {
                    language: "java",
                    defaultAccessType: "public",
                    accessTypes: ["public"],
                    returnTypes: [
                        {
                            returnType: "void",
                            shouldReturn: ""
                        }
                    ],
                    bodyTemplate: "",
                }
            ]
        }
        let methodHeader: string = "";
        let language = "java";

        let result = methodBodyGenerator.generateMethod(
            methodGeneratorConfig,
            methodHeader,
            language
        )

        expect(result.trim()).toEqual("// unsupported parameters in method header:");

    });

    it('should return proper method with body', () => {
        let methodBodyGenerator = new MethodBodyGenerator;

        let methodGeneratorConfig: MethodGeneratorConfig = {
            generatePatterns: [
                {
                    language: "java",
                    defaultAccessType: "public",
                    accessTypes: ["public"],
                    returnTypes: [
                        {
                            returnType: "void",
                            shouldReturn: ""
                        }
                    ],
                    bodyTemplate: "\t@Override\n\t$ACCESS_TYPE$ $RETURN_TYPE$ $NAME$($PARAMS$){\n\t\t$RETURN_TYPE_VALUE$\n\t}",
                }
            ]
        }
        let methodHeaderTest1: string = "public void testMethod();";
        let methodHeaderTest2: string = "void testMethod();";
        let language = "java";

        let resultTest1 = methodBodyGenerator.generateMethod(
            methodGeneratorConfig,
            methodHeaderTest1,
            language
        )
        let resultTest2 = methodBodyGenerator.generateMethod(
            methodGeneratorConfig,
            methodHeaderTest2,
            language
        )



        expect(resultTest1).toEqual("\t@Override\n\tpublic void testMethod(){\n\t\t\n\t}");
        expect(resultTest2).toEqual("\t@Override\n\tpublic void testMethod(){\n\t\t\n\t}");
    })

    it('should get method headers', () => {
        let methodBodyGenerator = new MethodBodyGenerator;
        let methods ="void testMethod()\nvoid testMethod2()";
        let expectOutcome = ["void testMethod()", "void testMethod2()"];

        expect(methodBodyGenerator.getMethodsHeaders(methods)).toEqual(expectOutcome);
    })

})