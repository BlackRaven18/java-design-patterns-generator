class $CONCRETE_BUILDER_CLASSNAME$ : public $BUILDER_CLASSNAME$
{
private:
    $PRODUCT_CLASSNAME$ *product;

public:
    $CONCRETE_BUILDER_CLASSNAME$()
    {
        this->product = new $PRODUCT_CLASSNAME$();
    }

$BUILDER_METHODS_EXTENDED$

    // void ProducePartA() const override
    // {
    // }

    // void ProducePartB() const override
    // {
    // }

    // void ProducePartC() const override
    // {
    // }

    $PRODUCT_CLASSNAME$ *GetProduct()
    {
        $PRODUCT_CLASSNAME$ *result = this->product;
        return result;
    }
};