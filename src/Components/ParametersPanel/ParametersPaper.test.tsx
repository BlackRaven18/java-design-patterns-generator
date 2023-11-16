import {render, screen} from "@testing-library/react";
import ParametersPaper from "./ParametersPaper";

describe('ParametersPaper', () => {

    it('should render', () => {

        render(
            <ParametersPaper header={""}/>
        )

        expect(screen.getByTestId('parameters-paper-test-id')).toBeInTheDocument();
    })
})