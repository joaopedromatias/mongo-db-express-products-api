import { Request, Response } from "express";
import { readFileSync } from 'fs';
import { Product } from "../../types";

const initialData: string = readFileSync(process.cwd() + '/resource/products.json','utf8');
let programData: Array<Product> = JSON.parse(initialData);

export const getProducts = (req: Request, res: Response) => { 
    try { 
        res.status(200).json({sucess: true, data: programData});
    } catch (err) { 
        res.status(500).send({sucess: false, message: 'server error, please reach out the support'})
    }
};

export const getProduct = (req: Request, res: Response) => { 
    const { id } = req.params;

    try { 
       const product: Array<Product> = programData.filter(product => product.id === Number(id))

        if (product.length === 1) { 
            res.status(200).json({sucess: true, data: product[0]});
        } else if (product.length === 0) { 
            res.status(404).send({sucess: false, message: 'no product matching the provided id'})
        } else {
            res.status(500).send({sucess: false, message: 'server error, please reach out the support'})
        }
    } catch (err) { 
        res.status(500).send({sucess: false, message: 'server error, please reach out the support'})
    }
};

export const createProduct = (req: Request, res: Response) => { 
    const { name, price, image_url } = req.body
    try { 
        if (!name || !price) { 
            res.status(400).json({sucess: false, message: 'You need to provide a name and a price to the new product'})
        } else {
            programData.push({ 
                id: programData.length + 1,
                name,
                price,
                image_url
            })
            res.status(201).send({sucess: true, message: 'product sucessfully registered'})
        }
    } catch (err) { 
        res.status(500).send({sucess: false, message: 'server error, please reach out the support'})
    }
};

export const updateProduct = (req: Request, res: Response) => { 
    const { id } = req.params;
    const { name, price, image_url } = req.body;

    try { 
        let product: Product | undefined = programData.find(product => product.id === Number(id));

    if( name || price || image_url) { 
        if (product) { 

            product.name = name || product.name
            product.price = price || product.price
            product.image_url = image_url || product.image_url

            programData[Number(id)-1] = product;

            res.status(200).json({sucess: true, message: 'product sucessfully updated'});
        } else { 
            res.status(404).send({sucess: false, message: 'no product matching the provided id'})
        }
    } else { 
        res.status(400).send({sucess: false, message: 'you need to provide at least a new property (name, price or image_url'})
    }
    } catch (err) { 
        res.status(500).send({sucess: false, message: 'server error, please reach out the support'})
    }    
};

export const deleteProduct = (req: Request, res: Response) => { 
    const { id } = req.params;

    try { 
        let filteredProgramData = programData.filter(product => product.id !== Number(id));

        if (programData.length - filteredProgramData.length === 1) {
            programData = filteredProgramData.map((product,index) => { 
                return { ...product, id: index + 1 }
            }) 
            res.status(200).json({sucess: true, message: 'product sucessfully deleted'});
        } else { 
            res.status(404).send({sucess: false, message: 'no product matching the provided id'});
        }
        
    } catch (err) { 
        res.status(500).send({sucess: false, message: 'server error, please reach out the support'});
    }
};