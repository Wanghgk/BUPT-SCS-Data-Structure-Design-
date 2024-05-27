import java.util.PriorityQueue;
import java.util.HashMap;

class HuffmanNode implements Comparable<HuffmanNode> {
    char data;
    int frequency;
    HuffmanNode left, right;

    public HuffmanNode(char data, int frequency) {
        this.data = data;
        this.frequency = frequency;
        left = right = null;
    }

    @Override
    public int compareTo(HuffmanNode node) {
        return this.frequency - node.frequency;
    }
}

public class HuffmanCompression {

    // 构建哈夫曼树
    private static HuffmanNode buildHuffmanTree(HashMap<Character, Integer> freqMap) {
        PriorityQueue<HuffmanNode> pq = new PriorityQueue<>();
        for (char c : freqMap.keySet()) {
            pq.offer(new HuffmanNode(c, freqMap.get(c)));
        }
        while (pq.size() > 1) {
            HuffmanNode left = pq.poll();
            HuffmanNode right = pq.poll();
            HuffmanNode parent = new HuffmanNode('\0', left.frequency + right.frequency);
            parent.left = left;
            parent.right = right;
            pq.offer(parent);
        }
        return pq.poll();
    }

    // 构建哈夫曼编码表
    private static void buildHuffmanCodeTable(HuffmanNode root, String code, HashMap<Character, String> codeTable) {
        if (root == null) return;
        if (root.left == null && root.right == null) {
            codeTable.put(root.data, code);
            return;
        }
        buildHuffmanCodeTable(root.left, code + "0", codeTable);
        buildHuffmanCodeTable(root.right, code + "1", codeTable);
    }

    // 压缩文本
    public static String compress(String text) {
        HashMap<Character, Integer> freqMap = new HashMap<>();
        for (char c : text.toCharArray()) {
            freqMap.put(c, freqMap.getOrDefault(c, 0) + 1);
        }
        HuffmanNode root = buildHuffmanTree(freqMap);
        HashMap<Character, String> codeTable = new HashMap<>();
        buildHuffmanCodeTable(root, "", codeTable);
        StringBuilder compressedText = new StringBuilder();
        for (char c : text.toCharArray()) {
            compressedText.append(codeTable.get(c));
        }
        return compressedText.toString();
    }

    // 解压文本
    public static String decompress(String compressedText, HuffmanNode root) {
        if (root == null) {
            throw new IllegalArgumentException("Root node cannot be null.");
        }
        StringBuilder decompressedText = new StringBuilder();
        HuffmanNode current = root;
        for (char bit : compressedText.toCharArray()) {
            if (bit == '0') {
                current = current.left;
            } else {
                current = current.right;
            }
            if (current != null && current.left == null && current.right == null) {
                decompressedText.append(current.data);
                current = root;
            }
        }
        return decompressedText.toString();
    }

    public static void main(String[] args) {
        String text = "Hello, World!";
        String compressedText = compress(text);
        System.out.println("Compressed Text: " + compressedText);
        // 在解压缩之前，需要重新构建哈夫曼树
        HuffmanNode root = buildHuffmanTree(new HashMap<>());
        System.out.println("Decompressed Text: " + decompress(compressedText, root));
    }
}
