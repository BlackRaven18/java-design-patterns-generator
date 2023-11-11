import java.util.HashMap;
import java.util.Map;

public class PooledObjectPool {
    private static final long expTime = 6000; //6 seconds
    public static HashMap<PooledObject, Long> available = new HashMap<>();
    public static HashMap<PooledObject, Long> inUse = new HashMap<>();

    public synchronized static PooledObject getObject() {
        long now = System.currentTimeMillis();
        if (!available.isEmpty()) {
            for (Map.Entry<PooledObject, Long> entry : available.entrySet()) {
                if (now - entry.getValue() > expTime) { //object has expired
                    popElement(available);
                } else {
                    PooledObject po = popElement(available, entry.getKey());
                    push(inUse, po, now);
                    return po;
                }
            }
        }

        // either no PooledObject is available or each has expired, so return a new one
        return createPooledObject(now);
    }

    private synchronized static PooledObject createPooledObject(long now) {
        PooledObject po = new PooledObject();
        push(inUse, po, now);
        return po;
    }

    private synchronized static void push(HashMap<PooledObject, Long> map, PooledObject po, long now) {
        map.put(po, now);
    }

    public static void releaseObject(PooledObject po) {
        cleanUp(po);
        available.put(po, System.currentTimeMillis());
        inUse.remove(po);
    }

    private static PooledObject popElement(HashMap<PooledObject, Long> map) {
        Map.Entry<PooledObject, Long> entry = map.entrySet().iterator().next();
        PooledObject key = entry.getKey();
        map.remove(entry.getKey());
        return key;
    }

    private static PooledObject popElement(HashMap<PooledObject, Long> map, PooledObject key) {
        map.remove(key);
        return key;
    }

    public static void cleanUp(PooledObject po) {
        po.setData(null);
    }
}