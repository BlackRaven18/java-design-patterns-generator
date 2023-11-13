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

    it('should return proper method', () => {
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

    })

})