export const ProduceData = [
    {
        id: 0,
        name: 'apple',
        price: '$1.11'
    },
    {
        id: 1,
        name: 'pear',
        price: '$1.21'
    },
    {
        id: 2,
        name: 'orange',
        price: '$1.31'
    },
    {
        id: 3,
        name: 'phone',
        price: '$70.11'
    },
    {
        id: 4,
        name: 'pad',
        price: '$20.11'
    },
    {
        id: 5,
        name: 'computer',
        price: '$30.11'
    }
];

export class ProductService {
    getProductById(id: number) {
        return ProduceData.find(p => p.id == id);
    }
}
