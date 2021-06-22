
# Q&A API

A scaled API handling 12 million+ rows of data for an Ecommerce website

## API Reference

#### Get all items

```http
  GET /qa/questions
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `product_id` | `integer` | **Required**. Specifies the product for which to retrieve questions. |
| `page` | `integer` | Selects the page of results to return. Default 1. |
| `count` | `integer` | Specifies how many results per page to return. Default 5. |
