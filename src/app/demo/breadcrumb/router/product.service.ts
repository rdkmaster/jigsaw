export const ProduceData = [
    {
        id: 0,
        name: 'apple',
        price: '$1.11',
        typeId: 0
    },
    {
        id: 1,
        name: 'pear',
        price: '$1.21',
        typeId: 0
    },
    {
        id: 2,
        name: 'orange',
        price: '$1.31',
        typeId: 0
    },
    {
        id: 3,
        name: 'phone',
        price: '$70.11',
        typeId: 1
    },
    {
        id: 4,
        name: 'pad',
        price: '$20.11',
        typeId: 1
    },
    {
        id: 5,
        name: 'computer',
        price: '$30.11',
        typeId: 1
    }
];

export class ProductService {
    getProductById(id: number) {
        return ProduceData.find(p => p.id == id);
    }

    getProductListByTypeId(typeId): any[] {
        return ProduceData.filter(p => p.typeId == typeId);
    }
}
