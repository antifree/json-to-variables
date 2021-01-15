# JSON to variables
This action reads json file and writes its content as environment variables.

## Inputs

### `filename`

**Required** The JSON file.

### `prefix`

The prefix. Default value `json`.

## Usage

### File content 
```
{
    "value": "value",
    "array": [
        "value 0",
        "value 1"
    ],
    "obj": {
        "value1": "value1",
        "value2": "value2"
    }
}
```

### YML example 
```
- name: JSON to variables
    uses: antifree/json-to-variables@v1
    with:
      filename: 'test.json'
      prefix: test
- name: Show output
    run: echo "The time was ${{ env.test_value }}, ${{ env.test_array_0_ }}, ${{ env.test_obj_value1 }}"
```
