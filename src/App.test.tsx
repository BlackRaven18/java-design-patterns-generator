import App from "./App"
import {render, screen, waitFor} from "@testing-library/react";
import {Config} from "./types";
import {Provider} from "react-redux";
import {store} from "./redux/store";
// Mock funkcji useDispatch


jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
}));

// Mock funkcji loadInitialState
// jest.mock('./utils/InitialStateLoader', () => ({
//     __esModule: true,
//     default: {
//
//         loadInitialState: jest.fn(() => Promise.resolve({ /* mock stanu początkowego */ })),
//     },
// }));

describe('App', () => {
    it('should render without errors', () => {
        render(
            <Provider store={store}>
                <App/>
            </Provider>
        );
        expect(screen.getByTestId('app-test-id')).toBeInTheDocument();
    });


});