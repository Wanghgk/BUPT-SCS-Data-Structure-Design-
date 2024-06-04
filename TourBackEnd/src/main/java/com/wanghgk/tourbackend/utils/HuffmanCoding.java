package com.wanghgk.tourbackend.utils;

import com.wanghgk.tourbackend.utils.entity.HuffmanComparator;
import com.wanghgk.tourbackend.utils.entity.HuffmanNode;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import java.util.PriorityQueue;

/**
 * @Author: dc
 * @create: 2024/5/25 - 22:36
 * @description:
 */
public class HuffmanCoding {
    private static Map<Character, String> huffmanCodes = new HashMap<>();
    private static Map<String, Character> reverseHuffmanCodes = new HashMap<>();


    //压缩样例
    public static void main(String[] args) throws IOException {
        String input = "有了上面的编码表之后，”we will we will r u”这句重新进行编码就可以得到很大的压缩，编码表示为：01 110 10 01 1111 00 00 10 01 110 10 01 1111 00 00 10 11101 10 11100。这样最终我们只需50位内存，比原ASCII码表示节约了2/3空间，效果还是很理想的";

        HuffmanCoding huffmanCoding = new HuffmanCoding();

        // Compress the input string and write to file
        String encodeStr = huffmanCoding.compress(input);
        System.out.println("Compressed: " + encodeStr);
        // Decompress the file and write the output to another file
        String decompressed = huffmanCoding.decompress(encodeStr);
        System.out.println("Decompressed: " + decompressed);

    }


    public String compress(String input) throws IOException {
        // Build Huffman Tree
        HuffmanNode root = buildHuffmanTree(input);
        System.out.println("Generating Huffman codes...");
        // Generate Huffman Codes
        generateHuffmanCodes(root, "");

        // Print the codes for debugging
        System.out.println("Huffman Codes: " + huffmanCodes);
        System.out.println("Compressing data...");
        // Compress the input string
        StringBuilder compressedData = new StringBuilder();
        for (char ch : input.toCharArray()) {
            compressedData.append(huffmanCodes.get(ch));
        }

        byte[] byteArray = binaryStringToByteArray(compressedData.toString());
        return new String(byteArray, StandardCharsets.UTF_16);
    }

    private static byte[] binaryStringToByteArray(String binaryString) {
        int byteLength = (binaryString.length() + 7) / 8;
        byte[] byteArray = new byte[byteLength];
        for (int i = 0; i < binaryString.length(); i += 8) {
            String byteString = binaryString.substring(i, Math.min(i + 8, binaryString.length()));
            byteArray[i / 8] = (byte) Integer.parseInt(byteString, 2);
        }
        return byteArray;
    }

    public String decompress(String encodeStr) throws IOException {
        System.out.println("Starting decompression...");
        // Decompress the data
        StringBuilder decodedData = new StringBuilder();
        HuffmanNode current = buildHuffmanTreeFromCodes();
        HuffmanNode root = current;
        StringBuilder binaryString = new StringBuilder();
        for (byte b : encodeStr.getBytes(StandardCharsets.UTF_16)) {
            binaryString.append(String.format("%8s", Integer.toBinaryString(b & 0xFF)).replace(' ', '0'));
        }
        for (char bit : binaryString.toString().toCharArray()) {
            current = bit == '1' ? current.right : current.left;
            if (current.left == null && current.right == null) {
                decodedData.append(current.character);
                current = root;
            }
        }
        return decodedData.toString();
    }

    private static HuffmanNode buildHuffmanTree(String input) {
        Map<Character, Integer> frequencyMap = new HashMap<>();
        for (char ch : input.toCharArray()) {
            frequencyMap.put(ch, frequencyMap.getOrDefault(ch, 0) + 1);
        }

        PriorityQueue<HuffmanNode> pq = new PriorityQueue<>(frequencyMap.size(), new HuffmanComparator());
        for (Map.Entry<Character, Integer> entry : frequencyMap.entrySet()) {
            HuffmanNode node = new HuffmanNode();
            node.character = entry.getKey();
            node.frequency = entry.getValue();
            pq.add(node);
        }

        while (pq.size() > 1) {
            HuffmanNode x = pq.poll();
            HuffmanNode y = pq.poll();
            HuffmanNode sum = new HuffmanNode();
            sum.frequency = x.frequency + y.frequency;
            sum.left = x;
            sum.right = y;
            pq.add(sum);
        }

        return pq.poll();
    }

    private static void generateHuffmanCodes(HuffmanNode root, String code) {
        if (root == null) {
            return;
        }
        if (root.left == null && root.right == null) {
            System.out.println("Character: " + root.character + ", Code: " + code);
            huffmanCodes.put(root.character, code);
            reverseHuffmanCodes.put(code, root.character);
        }
        generateHuffmanCodes(root.left, code + "0");
        generateHuffmanCodes(root.right, code + "1");
    }

    private static HuffmanNode buildHuffmanTreeFromCodes() {
        HuffmanNode root = new HuffmanNode();
        for (Map.Entry<String, Character> entry : reverseHuffmanCodes.entrySet()) {
            String code = entry.getKey();
            char character = entry.getValue();
            HuffmanNode current = root;
            for (char bit : code.toCharArray()) {
                if (bit == '1') {
                    if (current.right == null) {
                        current.right = new HuffmanNode();
                    }
                    current = current.right;
                } else {
                    if (current.left == null) {
                        current.left = new HuffmanNode();
                    }
                    current = current.left;
                }
            }
            current.character = character;
        }
        return root;
    }
}