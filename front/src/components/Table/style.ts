import { styled } from 'styled-components'

export const Table = styled.table`
    width: 100%;
    border-spacing: 0;
    border: 4px solid ${(props) => props.theme.lighterGray};
    border-radius: 16px;

    thead th {
        font-weight: 700;
        background-color: ${(props) => props.theme.lightGreen};
        color: ${(props) => props.theme.whiteText};
        border-bottom: 1px solid #e0e0e0;
    }

    thead th:first-child {
        border-radius: 12px 0 0 0;
    }

    thead th:last-child {
        border-radius: 0 12px 0 0;
    }

    th {
        padding: 0.5rem 1rem;
        text-align: left;
        font-size: 1rem;
        text-align: center;
        background-color: #fbfdfd;
        border-bottom: 1px solid #e0e0e0;
        color: ${(props) => props.theme.text};
    }

    tbody tr:nth-of-type(odd) {
        background: #fbfdfd;
    }

    tbody tr:nth-of-type(even) {
        background: #f6f5f8;
    }

    td {
        text-align: left;
        font-weight: 500;
        font-size: 1rem;
        text-align: center;
        border-bottom: 1px solid ${(props) => props.theme.lightGray};
        color: ${(props) => props.theme.text};
    }

    td button {
        display: block;
        width: 100%;
        height: 100%;
        border: none;
        background: none;
        cursor: pointer;

        &:hover {
            background-color: ${(props) => props.theme.lighterGreen};
            transition: 0.2s;
            svg {
                color: ${(props) => props.theme.whiteText};
            }
        }
    }

    tr:last-child td:last-child {
        border-radius: 0 0 13px 0;
    }

    .LowStock {
        background-color: ${(props) => props.theme.red} !important;
    }

    .LowStock td {
        color: ${(props) => props.theme.whiteText};

        button {
            color: ${(props) => props.theme.whiteText};
            transition: 0.2s;
            &:hover {
                background-color: ${(props) => props.theme.whiteText};
                svg {
                    color: ${(props) => props.theme.red};
                }
            }
        }
    }

    tbody td {
        overflow-wrap: break-word;
        word-wrap: break-word;
        hyphens: auto;
        height: 2.25rem;
    }

    @media (min-width: 701px) {
        th {
            padding: 0.5rem 0;
        }

        tbody td {
            padding: 0;
        }

        tr:last-child td {
            border-bottom: none;
        }

        tr:last-child td:last-child button {
            border-radius: 0 0 12px 0;
        }
    }

    @media (max-width: 700px) {
        /* Force table to not be like tables anymore */
        thead,
        tbody,
        th,
        td,
        tr {
            display: block;
        }

        /* Hide table headers (but not display: none;, for accessibility) */
        thead tr {
            position: absolute;
            top: -9999px;
            left: -9999px;
        }

        tr {
            border-bottom: 8px solid ${(props) => props.theme.lighterGray};
            /* border-top: none; */
        }

        td {
            /* Behave  like a "row" */
            position: relative;
            padding: 0.5rem 0;
            padding-left: 50%;
        }

        td:before {
            /* Now like a table header */
            position: absolute;
            /* Top/left values mimic padding */
            top: 0px;
            left: 0px;
            width: 45%;
            padding-right: 10px;
            white-space: nowrap;
            content: attr(data-label);
            font-weight: 700;
            background-color: ${(props) => props.theme.lightGreen};
            color: ${(props) => props.theme.whiteText};
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        tr:first-child {
            border-radius: 12px 12px 0 0;
            /* border-top: 3px solid var(--color-lighter-gray); */
        }

        tr:first-child td:first-child::before {
            border-radius: 12px 0 0 0;
        }

        tr:last-child {
            border-radius: 0 0 12px 12px;
            border-bottom: none;
        }

        tr td:last-child {
            border: none;
        }

        tr:last-child td:last-child::before {
            border-radius: 0 0 0 12px;
        }

        tr:last-child {
            border-radius: 0 0 12px 12px;
        }
    }
`
