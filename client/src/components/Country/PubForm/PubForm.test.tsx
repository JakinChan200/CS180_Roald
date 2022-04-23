import { render, fireEvent, screen } from '@testing-library/react';
import { PubForm } from './PubForm';
import { rest } from 'msw';
import { setupServer } from 'msw/node'
import { BACKEND_URL } from '../../../constants/backendURL';

const setResults = jest.fn();

const videos = [
    "04/02/2021",
    "04/20/2022",
];
const testName = "user123";

//mock all endpoint requests
const server = setupServer(
    rest.post(`${BACKEND_URL}/register`, (req, res, ctx) => {
        return res(ctx.status(201), ctx.json(videos))
    }),
    rest.post(`${BACKEND_URL}/user/delete`, (req, res, ctx) => {
        return res(ctx.status(201), ctx.json(videos))
    }),
    rest.post(`${BACKEND_URL}/videos`, (req, res, ctx) => {
        return res(ctx.status(201), ctx.json(videos))
    }),
)

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("PubForm", () => {
    describe("when a username is entered", () => {
        describe('save button', () => {
            test('is rendered', () => {
                render(<PubForm setResults={setResults()} />);
                fireEvent.change(screen.getByLabelText('username'), { target: { value: testName } });
                fireEvent.change(screen.getByLabelText('password'), { target: { value: testName } });
                expect(screen.getByRole('button', { name: 'Save' })).toBeDefined();
            })
        })
        describe('delete button', () => {
            test('is rendered', () => {
                render(<PubForm setResults={setResults()} />);
                fireEvent.change(screen.getByLabelText('username'), { target: { value: testName } });
                fireEvent.change(screen.getByLabelText('password'), { target: { value: testName } });
                expect(screen.getByRole('button', { name: 'Delete' })).toBeDefined();
            })
            test('when clicked calls setResults', () => {
                render(<PubForm setResults={setResults()} />);
                fireEvent.change(screen.getByLabelText('username'), { target: { value: testName } });
                fireEvent.change(screen.getByLabelText('password'), { target: { value: testName } });
                const button = screen.getByRole('button', { name: 'Delete' });
                fireEvent.click(button);
                expect(setResults).toBeCalled();
            })
        })
    });
    describe("when username is empty", () => {
        test("no render of save button", () => {
            render(<PubForm setResults={setResults()} />);
            expect(screen.queryByRole('button', { name: 'Save' })).toEqual(null);
        });
        test("no render of delete button", () => {
            render(<PubForm setResults={setResults()} />);
            expect(screen.queryByRole('button', { name: 'Save' })).toEqual(null);
        });
    });
});
