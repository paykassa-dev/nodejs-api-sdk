# Paykassa SCI & API (node)

## Installation

```
npm i paykassa-api-sdk
```


<?php
        $examples = [

        [
            "file" => "create_address.js",
            "title" => "Get a deposit address",
        ],
        [
            "file" => "processing_ipn_for_transaction.js",
            "title" => "Check an IPN of a transaction",
        ],
        [
            "file" => "create_payment_link.js",
            "title" => "Get a payment link(create an order)",
        ],
        [
            "file" => "processing_ipn_for_order.js",
            "title" => "Check an IPN of an order",
        ],
        [
            "file" => "send_money.js",
            "title" => "Send money",
        ],
        [
            "file" => "get_merchant_balance.js",
            "title" => "Get a merchant balance",
        ],
        [
            "file" => "get_payment_txid.js",
            "title" => "Get a txid of a payment",
        ],
    ];

?>

**To run examples:**
```bash
cp ./.env.example ./.env
```

<?php foreach ($examples as $item) { ?>
### <?php echo $item["title"]; ?>

```js
<?php echo file_get_contents(sprintf("%s%s%s", __DIR__, "/../examples/", $item["file"])); ?>

```

**Example:**
```bash
node ./examples/<?php echo $item["file"]; ?>

```

<?php } ?>

## References
- [Devs Documentation](https://paykassa.pro/en/developers)
- [API Documentation](https://paykassa.pro/docs/)

## Contributing
If during your work with this wrapper you encounter a bug or have a suggestion to help improve it for others, you are welcome to open a Github issue on this repository and it will be reviewed by one of our development team members. The Paykassa.pro bug bounty does not cover this wrapper.

## License
MIT - see LICENSE