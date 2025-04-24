import styled from 'styled-components'

export const Container = styled.div`
    display: block;
    

    .header-notfound{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px;

        h1{
            font-size: 50px;
        }
    }

    .content-notfound{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px;
        flex-wrap: wrap;
        flex-direction: column;
        h3{
            font-size: 50px;
            color: #0006;
        }
        /* img{
            width: 50px;
            height: 50px;
        } */
    }

    .footer-notfound{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        label{
            margin-right: 10px;
            font-size: 50px;
        }

        a{
            font-size: 50px;
            transition: color .3s;
        }

        a:hover{
            color: #5dbdf5;
            text-decoration: underline;
        }
        
    }
`