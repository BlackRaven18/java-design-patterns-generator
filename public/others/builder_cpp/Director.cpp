class $DIRECTOR_CLASSNAME$
{
private:
    $BUILDER_CLASSNAME$ *builder;

public:
    void setBuilder($BUILDER_CLASSNAME$ *builder)
    {
        this->builder = builder;
    }


    void construct()
    {
        //this->builder->ProducePartA();
        //this->builder->ProducePartB();
        //this->builder->ProducePartC();
    }
}