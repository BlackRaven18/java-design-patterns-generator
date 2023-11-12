import java.util.HashMap;
import java.util.Map;

public class $POOLED_OBJECT_POOL_CLASS_NAME$ {
    private static final long expTime = $POOLED_OBJECT_EXPIRATION_TIME$; 
    public static HashMap<$POOLED_OBJECT_CLASS_NAME$, Long> available = new HashMap<>();
    public static HashMap<$POOLED_OBJECT_CLASS_NAME$, Long> inUse = new HashMap<>();

    public synchronized static $POOLED_OBJECT_CLASS_NAME$ $GET_OBJECT_METHOD_NAME$() {
        long now = System.currentTimeMillis();
        if (!available.isEmpty()) {
            for (Map.Entry<$POOLED_OBJECT_CLASS_NAME$, Long> entry : available.entrySet()) {
                if (now - entry.getValue() > expTime) { //object has expired
                    $POP_ELEMENT_METHOD_NAME$(available);
                } else {
                    $POOLED_OBJECT_CLASS_NAME$ po = $POP_ELEMENT_METHOD_NAME$(available, entry.getKey());
                    $PUSH_METHOD_NAME$(inUse, po, now);
                    return po;
                }
            }
        }

        // either no $POOLED_OBJECT_CLASS_NAME$ is available or each has expired, so return a new one
        return createPooledObject(now);
    }

    private synchronized static $POOLED_OBJECT_CLASS_NAME$ $CREATE_POOLED_OBJECT_METHOD_NAME$(long now) {
        $POOLED_OBJECT_CLASS_NAME$ po = new $POOLED_OBJECT_CLASS_NAME$();
        $PUSH_METHOD_NAME$(inUse, po, now);
        return po;
    }

    private synchronized static void $PUSH_METHOD_NAME$(HashMap<$POOLED_OBJECT_CLASS_NAME$, Long> map, $POOLED_OBJECT_CLASS_NAME$ po, long now) {
        map.put(po, now);
    }

    public static void $RELEASE_OBJECT_METHOD_NAME$($POOLED_OBJECT_CLASS_NAME$ po) {
        $CLEAN_UP_METHOD_NAME$(po);
        available.put(po, System.currentTimeMillis());
        inUse.remove(po);
    }

    private static $POOLED_OBJECT_CLASS_NAME$ $POP_ELEMENT_METHOD_NAME$(HashMap<$POOLED_OBJECT_CLASS_NAME$, Long> map) {
        Map.Entry<$POOLED_OBJECT_CLASS_NAME$, Long> entry = map.entrySet().iterator().next();
        $POOLED_OBJECT_CLASS_NAME$ key = entry.getKey();
        map.remove(entry.getKey());
        return key;
    }

    private static $POOLED_OBJECT_CLASS_NAME$ $POP_ELEMENT_METHOD_NAME$(HashMap<$POOLED_OBJECT_CLASS_NAME$, Long> map, $POOLED_OBJECT_CLASS_NAME$ key) {
        map.remove(key);
        return key;
    }

    public static void $CLEAN_UP_METHOD_NAME$($POOLED_OBJECT_CLASS_NAME$ po) {
        po.setData(null);
    }
}