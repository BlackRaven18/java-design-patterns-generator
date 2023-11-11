public class Client {

    public void operation() {
        ConcreteAggregate collection = new ConcreteAggregate();

        collection.add("Element 1");
        collection.add("Element 2");
        collection.add("Element 3");

        Iterator iterator = collection.createIterator();

        while(iterator.isDone()){
            System.out.println(iterator.next());
        }

    }
}
