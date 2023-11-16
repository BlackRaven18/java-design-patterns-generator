import ParametersTabs from "./ParametersTabs";
import {fireEvent, render, screen} from "@testing-library/react";


describe('ParametersTabs', () => {

    it('should render', () => {

        render(
            <ParametersTabs
                selectedTabIndex={0}
                setSelectedTabIndex={jest.fn()}
                globalParamsNumber={0}
                localParamsNumber={0}
            />
        )

         expect(screen.getByTestId('parameters-tabs-test-id')).toBeInTheDocument();
    })

    it('tab should be changed', () => {

        render(
            <ParametersTabs
                selectedTabIndex={0}
                setSelectedTabIndex={jest.fn()}
                globalParamsNumber={1}
                localParamsNumber={1}
            />
        )

        fireEvent.click(screen.getByTestId("pattern-file-parameters-tab-test-id"));

        expect(screen.getByTestId("pattern-file-parameters-tab-test-id")).toBeVisible();
    })
})