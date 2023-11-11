public class $CLIENT_CLASS_NAME$ {

    public void operation() {
        $CONCRETE_AGGREGATE_CLASS_NAME$ collection = new $CONCRETE_AGGREGATE_CLASS_NAME$();

        collection.add("Element 1");
        collection.add("Element 2");
        collection.add("Element 3");

        Iterator iterator = collection.createIterator();

        while(iterator.$ISDONE_METHOD_NAME$()){
            System.out.println(iterator.$NEXT_METHOD_NAME$());
        }

    }
}
